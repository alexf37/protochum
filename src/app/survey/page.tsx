import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default async function Survey() {
  return (
    <>
      <div className="flex max-w-96 flex-col gap-2 rounded-2xl bg-white p-8 text-black shadow-md">
        <h2 className="text-2xl font-bold">Question 1</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit?</p>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
}
