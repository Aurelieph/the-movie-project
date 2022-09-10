import styled from "styled-components";

const MovieDetails = ({selectedPopupItem,creditInfo,title,date})=>{
  return (
    <DescriptionArea>
    <Title>
      {title}
      <Media>{selectedPopupItem.media_type}</Media>
      <Date>{date.substr(0, 4)}</Date>
    </Title>

    <Synopsis>
      <Label>Synopsis:</Label>
      {selectedPopupItem.overview}
    </Synopsis>
    <ItemId>Popularity: {selectedPopupItem.popularity}</ItemId>
    <Actors>
      {creditInfo?.cast.slice(0,5).map((actor) => {
        return <Actor key={`actor-${actor.id}`}>{actor.name}</Actor>;
      })}
    </Actors>
  </DescriptionArea>
  )
}

export default MovieDetails

const Actors = styled.div``;
const Actor = styled.div``;
const Label = styled.div`
  font-size: 16px;
  margin: 20px 0 10px 0;
`;
const Synopsis = styled.div`
  font-size: 14px;
`;
const Date = styled.span`
  font-size: 12px;
  margin-left:10px;
`;
const DescriptionArea = styled.div`
  align-items: center;
  background-color: var(--primary-color);
  text-align: left;
  margin-left: 40px;
  border-radius: 5px;
  /* width: 40%; */
  padding: 10px;
`;
const ItemId = styled.div`
  font-size: 10px;
  /* padding: 10px; */
  margin: 20px 0 10px 0;
`;
const Title = styled.div`
  font-weight: bold;
  margin: 10px 0;
  font-size: 30px;
`;
const Media = styled.span`
  font-size: 10px;
  margin-left: 5px;
  font-style: italic;
  font-weight: bold;
`;