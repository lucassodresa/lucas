import type { SpacingScale } from '../types/spacing';

export interface SpacingProps {
  padding?: SpacingScale;
  paddingX?: SpacingScale;
  paddingY?: SpacingScale;
  paddingTop?: SpacingScale;
  paddingRight?: SpacingScale;
  paddingBottom?: SpacingScale;
  paddingLeft?: SpacingScale;
  margin?: SpacingScale;
  marginX?: SpacingScale;
  marginY?: SpacingScale;
  marginTop?: SpacingScale;
  marginRight?: SpacingScale;
  marginBottom?: SpacingScale;
  marginLeft?: SpacingScale;
}

export function resolveSpacingClasses(props: SpacingProps): string[] {
  const classes: string[] = [];

  const paddingTop = props.paddingTop ?? props.paddingY ?? props.padding;
  const paddingRight = props.paddingRight ?? props.paddingX ?? props.padding;
  const paddingBottom = props.paddingBottom ?? props.paddingY ?? props.padding;
  const paddingLeft = props.paddingLeft ?? props.paddingX ?? props.padding;

  const marginTop = props.marginTop ?? props.marginY ?? props.margin;
  const marginRight = props.marginRight ?? props.marginX ?? props.margin;
  const marginBottom = props.marginBottom ?? props.marginY ?? props.margin;
  const marginLeft = props.marginLeft ?? props.marginX ?? props.margin;

  if (paddingTop !== undefined) classes.push(`paddingTop-${paddingTop}`);
  if (paddingRight !== undefined) classes.push(`paddingRight-${paddingRight}`);
  if (paddingBottom !== undefined) classes.push(`paddingBottom-${paddingBottom}`);
  if (paddingLeft !== undefined) classes.push(`paddingLeft-${paddingLeft}`);

  if (marginTop !== undefined) classes.push(`marginTop-${marginTop}`);
  if (marginRight !== undefined) classes.push(`marginRight-${marginRight}`);
  if (marginBottom !== undefined) classes.push(`marginBottom-${marginBottom}`);
  if (marginLeft !== undefined) classes.push(`marginLeft-${marginLeft}`);

  return classes;
}
