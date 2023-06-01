import CartBackButton from "@/js/components/utils/CartBackButton";
import CartNextButton from "@/js/components/utils/CartNextButton";

export default function CartNavButtonsContainer({ nextBtnDisabled, nextBtnText, nextBtnOnClick }) {
  return (
    <div className="navigation-buttons">
      <CartBackButton/>
      <CartNextButton disabled={nextBtnDisabled} text={nextBtnText} onClick={nextBtnOnClick}/>
    </div>
  );
}