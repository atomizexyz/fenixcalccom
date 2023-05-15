import { IconInfoCircleFilled } from "@tabler/icons-react";

export default function Tutorial() {
  return (
    <div className="rounded-md alert-info-background p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <IconInfoCircleFilled className="h-5 w-5 alert-info-icon" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm alert-info-title">
            Learn how to use Fenix Calc by checking a <a className="underline" target="_blank" href="https://www.youtube.com/live/YQVkpQyM8os?feature=share&t=1003">video here</a>.
          </p>
          <p className="mt-3 text-sm md:ml-6 md:mt-0"></p>
        </div>
      </div>
    </div>
  );
}
