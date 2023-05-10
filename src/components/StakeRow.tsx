import { GlobalData, StakeColumnData } from "@/models/models";
import { NextPage } from "next";
import { useEffect, useState } from "react";

export const StakeRow: NextPage<{ stakeColumnData: StakeColumnData; globalData: GlobalData; removeStake: any }> = ({
  stakeColumnData,
  globalData,
  removeStake,
}) => {
  const [payout, setPayout] = useState(0);
  useEffect(() => {
    const sharePercent = stakeColumnData.shares / globalData.totalShares;
    const equityPayout = sharePercent * globalData.equityPool;
    const rewardPayout = sharePercent * globalData.rewardPool;
    setPayout(equityPayout + rewardPayout);
  }, [globalData.equityPool, globalData.rewardPool, globalData.totalShares, stakeColumnData.shares]);
  return (
    <>
      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm primary-text sm:pl-0">
        {stakeColumnData.fenix.toLocaleString()}
      </td>
      <td className="whitespace-nowrap px-2 py-2 text-sm primary-text">{stakeColumnData.term.toLocaleString()}</td>
      <td className="whitespace-nowrap px-2 py-2 text-sm primary-text">{stakeColumnData.sizeBonus.toLocaleString()}</td>
      <td className="whitespace-nowrap px-2 py-2 text-sm primary-text">{stakeColumnData.timeBonus.toLocaleString()}</td>
      <td className="whitespace-nowrap px-2 py-2 text-sm primary-text">
        {stakeColumnData.totalBonus.toLocaleString()}
      </td>
      <td className="whitespace-nowrap px-2 py-2 text-sm primary-text">{stakeColumnData.shares.toLocaleString()}</td>
      <td className="whitespace-nowrap px-2 py-2 text-sm primary-text">{payout.toLocaleString()}</td>
      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <button onClick={() => removeStake(stakeColumnData.id)} className="primary-link">
          End<span className="sr-only">,</span>
        </button>
      </td>
    </>
  );
};
