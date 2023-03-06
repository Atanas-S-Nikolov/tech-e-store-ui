import styled from "@emotion/styled";

export default function StyledGridContainer(props) {
  const GridContainer = styled('div')(({ theme }) => ({
    border: "none",
    padding: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: props.gridTemplateColumns,
    gap: props.gap
  }));

  return (
    <GridContainer>
      {props.children}
    </GridContainer>
  )
}