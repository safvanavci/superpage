import Icon from "../assets/icon.png";

export default function Logo() {
  return (
    <div className="flex items-center gap-x-3 font-bold text-xl">
      <img src={Icon} alt="" className="w-[30px]" />
      Superpage
    </div>
  );
}
