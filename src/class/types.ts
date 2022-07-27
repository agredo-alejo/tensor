export type TensorLike1D = number[]
export type TensorLike2D = number[][]
export type TensorLike3D = number[][][]
export type TensorLike4D = number[][][][]
export type TensorLike5D = number[][][][][]
export type TensorLike6D = number[][][][][][]
export type TensorLike7D = number[][][][][][][]


export type TensorArray = TensorLike1D | TensorLike2D | TensorLike3D | TensorLike4D | TensorLike5D | TensorLike6D | TensorLike7D

export type TensorLike = number | TensorArray


export type TensorObject = {
    data: TensorLike
    shape: number[]
    rank: number
}