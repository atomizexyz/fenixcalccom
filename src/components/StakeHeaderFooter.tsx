import { NextPage } from "next";

export const StakeHeaderFooter: NextPage = () => {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold secondary-text sm:pl-0"
        >
          FENIX
        </th>
        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold secondary-text">
          Term
        </th>
        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold secondary-text">
          Size Bonus
        </th>
        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold secondary-text">
          Time Bonus
        </th>
        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold secondary-text">
          Total Bonus
        </th>
        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold secondary-text">
          Shares
        </th>
        <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold secondary-text">
          Payout
        </th>
        <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};
