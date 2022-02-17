import SetCard from "./SetCard";
import allSets from "../pokemonSets/allSets";

function AllSets(props) {
  //sent from the app as a prop. Changes the set and then closes the modal
  const changeSet = (set) => {
    props.changeSet(set);
    props.handleClose();
  };
  const renderSets = allSets.map((set) => (
    <SetCard key={set.id} set={set} changeSet={changeSet} />
  ));

  return <div className="row allSets">{renderSets}</div>;
}

export default AllSets;
