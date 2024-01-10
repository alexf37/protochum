import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default async function Survey() {
  return (
    <>
      <div className="flex max-w-96 flex-col gap-2 rounded-2xl bg-white p-8 text-black shadow-md">
        <h2 className="text-2xl font-bold">Question 1</h2>
        <p className="pb-2 font-sans">
          Lorem ipsum dolor sit amet consectetur adipisicing elit?
        </p>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="option-one"
              id="option-one"
              className="border-slate-400"
            />
            <Label className="text-base" htmlFor="option-one">
              Lorem ipsum
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="option-two"
              id="option-two"
              className="border-slate-400"
            />
            <Label className="text-base" htmlFor="option-two">
              Dolor sit
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="option-three"
              id="option-three"
              className="border-slate-400"
            />
            <Label className="text-base" htmlFor="option-three">
              Amet consectetur
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="option-four"
              id="option-four"
              className="border-slate-400"
            />
            <Label className="text-base" htmlFor="option-four">
              Adipisicing elit
            </Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
}
