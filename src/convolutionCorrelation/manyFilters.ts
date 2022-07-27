import { Tensor, TensorLike, TensorLike3D, TensorLike4D } from "../class"
import { zeros } from "../creation"
import { padding, rotate180 } from "../matrix"
import { ensureTensor, _inferShape } from "../utils"
import { manyFiltersOutputShape } from "./outputShape"
import { cc_paddingAmt } from "./paddingAmt"


export const correlateManyFilters = (
   input: Tensor | TensorLike3D,
   filters: Tensor | TensorLike4D,
   _padding: number[] | string = [0, 0],
   stride = [1, 1],
   dilation = [1, 1]
) => {

   let internInput = ensureTensor(input)
   let internFilter = ensureTensor(filters)

   let paddAmt = _padding instanceof Array ? _padding :
      cc_paddingAmt(
         internInput.shape,
         internFilter.shape,
         _padding, stride, dilation
      )


   let inputData: TensorLike3D | Tensor = []
   for (let index = 0; index < internInput.shape[0]; index++) {
      inputData[index] = padding(internInput.data[index], paddAmt).data
   }
   inputData = new Tensor(inputData, _inferShape(inputData))

   let outputShape = manyFiltersOutputShape(internInput.shape, internFilter.shape, paddAmt, stride, dilation)


   let result = zeros(outputShape)
   for (let numFilters = 0; numFilters < internFilter.shape[0]; numFilters++) {

      for (let depth = 0; depth < internInput.shape[0]; depth++) {
         for (let imgRow = 0; imgRow < outputShape[1]; imgRow++) {
            for (let imgCol = 0; imgCol < outputShape[2]; imgCol++) {
               let sum = 0
               for (let kernelRow = 0; kernelRow < internFilter.shape[2]; kernelRow++) {
                  for (let kernelCol = 0; kernelCol < internFilter.shape[3]; kernelCol++) {
                     let row = kernelRow * dilation[0] + imgRow * stride[0]
                     let col = kernelCol * dilation[1] + imgCol * stride[1]

                     sum += inputData.data[depth][row][col] * internFilter.data[numFilters][depth][kernelRow][kernelCol]
                  }
               }
               result.data[numFilters][imgRow][imgCol] += sum
            }
         }
      }
   }

   return result
}

export const convolutionManyFilters = (
   input: Tensor | TensorLike3D,
   filters: Tensor | TensorLike4D,
   _padding: number[] | string = [0, 0],
   stride = [1, 1],
   dilation = [1, 1]
) => {
   let internFilter = ensureTensor(filters)

   let rotatedFilter: number[][][][] | Tensor = []
   for (let nFilters = 0; nFilters < internFilter.shape[0]; nFilters++) {
      rotatedFilter[nFilters] = []
      for (let depth = 0; depth < internFilter.shape[1]; depth++) {
         rotatedFilter[nFilters][depth] = rotate180(internFilter.data[nFilters][depth]).data
      }
   }
   rotatedFilter = new Tensor(rotatedFilter, internFilter.shape)

   return correlateManyFilters(input, internFilter, _padding, stride, dilation)
}



export const correlationManyFiltersAddBias = (
   input: Tensor | TensorLike3D,
   filters: Tensor | TensorLike4D,
   bias: Tensor | TensorLike,
   _padding: number[] | string = [0, 0],
   stride = [1, 1],
   dilation = [1, 1]
) => {
   
   let internInput = ensureTensor(input)
   let internFilter = ensureTensor(filters)
   let internBias = ensureTensor(bias)

   let paddAmt = _padding instanceof Array ? _padding :
      cc_paddingAmt(
         internInput.shape,
         internFilter.shape,
         _padding, stride, dilation
      )



   let inputData: TensorLike3D | Tensor = []
   for (let index = 0; index < internInput.shape[0]; index++) {
      inputData[index] = padding(internInput.data[index], paddAmt).data
   }
   inputData = new Tensor(inputData, _inferShape(inputData))

   let outputShape = manyFiltersOutputShape(internInput.shape, internFilter.shape, paddAmt, stride, dilation)


   let result = zeros(outputShape)
   for (let numFilters = 0; numFilters < internFilter.shape[0]; numFilters++) {

      for (let depth = 0; depth < internInput.shape[0]; depth++) {
         for (let imgRow = 0; imgRow < outputShape[1]; imgRow++) {
            for (let imgCol = 0; imgCol < outputShape[2]; imgCol++) {
               let sum = 0
               for (let kernelRow = 0; kernelRow < internFilter.shape[2]; kernelRow++) {
                  for (let kernelCol = 0; kernelCol < internFilter.shape[3]; kernelCol++) {
                     let row = kernelRow * dilation[0] + imgRow * stride[0]
                     let col = kernelCol * dilation[1] + imgCol * stride[1]

                     sum += inputData.data[depth][row][col] * internFilter.data[numFilters][depth][kernelRow][kernelCol]
                  }
               }
               result.data[numFilters][imgRow][imgCol] += sum + internBias.data[numFilters][imgRow][imgCol] / outputShape[0]
            }
         }
      }
   }

   return result
}

export const convolutionManyFiltersAddBias = (
   input: Tensor | TensorLike3D,
   filters: Tensor | TensorLike4D,
   bias: Tensor | TensorLike,
   _padding: number[] | string = [0, 0],
   stride = [1, 1],
   dilation = [1, 1]
) => {
   let internFilter = ensureTensor(filters)

   let rotatedFilter: number[][][][] | Tensor = []
   for (let nFilters = 0; nFilters < internFilter.shape[0]; nFilters++) {
      rotatedFilter[nFilters] = []
      for (let depth = 0; depth < internFilter.shape[1]; depth++) {
         rotatedFilter[nFilters][depth] = rotate180(internFilter.data[nFilters][depth]).data
      }
   }
   rotatedFilter = new Tensor(rotatedFilter, internFilter.shape)

   return correlationManyFiltersAddBias(input, internFilter, bias, _padding, stride, dilation)
}