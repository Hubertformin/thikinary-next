/*
  * Generate named transformation
  * */
declare type NamedTransformationType = 'small' | 'medium' | 'large' | 'placeholder';

export function generateNamedTransformation(url: string, type: NamedTransformationType) {
  return `${url}?tr=n-${type}`;
}
