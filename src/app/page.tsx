"use client";
import Image from "next/image";
import { StakeRow } from "@/components/StakeRow";
import { StakeHeaderFooter } from "@/components/StakeHeaderFooter";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FENIX_INFLATION, MAX_STAKE_TERM, YEAR_DAYS } from "@/utilities/constants";
import { GlobalData, StakeColumnData } from "@/models/models";
import { v4 as uuidv4 } from "uuid";
import { FenixCalcText } from "@/components/FenixCalcText";

export default function Home() {
  const [globalData, setGlobalData] = useState<GlobalData>({ rewardPool: 0, equityPool: 0, totalShares: 0 });
  const [stakesColumnData, setStakesColumnData] = useState<StakeColumnData[]>([]);

  const rewardPoolSchema = yup
    .object()
    .shape({
      rewardPool: yup
        .number()
        .required("Amount Required")
        .max(100_000_000_000, `Maximum amount is ${Number(100_000_000_000).toLocaleString()}`)
        .min(0, "Amount must be greater or equal to 0")
        .typeError("Amount required"),
    })
    .required();

  const { register: registerRewardPool, handleSubmit: handleSubmitRewardPool } = useForm({
    mode: "onChange",
    resolver: yupResolver(rewardPoolSchema),
  });

  const onUpdateRewardPool = (data: any) => {
    const { rewardPool } = data;
    setGlobalData({ ...globalData, rewardPool });
  };

  const addStakeSchema = yup
    .object()
    .shape({
      fenix: yup
        .number()
        .required("Amount Required")
        .max(100_000_000_000, `Maximum amount is ${Number(100_000_000_000).toLocaleString()}`)
        .positive("Amount must be greater than 0")
        .typeError("Amount required"),
      term: yup
        .number()
        .required("Term Required")
        .max(7_777, "Maximum term is 7_777")
        .positive("Term must be greater than 0")
        .typeError("Term required"),
    })
    .required();

  const {
    register,
    handleSubmit: handleSubmitStake,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addStakeSchema),
  });
  const onSubmitStake = (data: any) => {
    const { term, fenix } = data;

    const id = uuidv4();
    const timeBonus = 1 + term / MAX_STAKE_TERM;
    const sizeBonus = 1 + (1 / fenix + 1);
    const totalBonus = sizeBonus * Math.E ** timeBonus;
    const inflation = fenix * (1 + FENIX_INFLATION) ** (term / YEAR_DAYS);
    const shares = totalBonus * inflation;

    const stakeColumnData: StakeColumnData = {
      id,
      fenix,
      term,
      timeBonus,
      sizeBonus,
      totalBonus,
      shares,
    };

    const equityPool = globalData.equityPool + inflation;
    const totalShares = globalData.totalShares + shares;
    setGlobalData({ ...globalData, equityPool, totalShares });

    stakesColumnData.push(stakeColumnData);
    setStakesColumnData(stakesColumnData);
  };

  const removeStake = (id: string) => {
    const newStakeColumnData = stakesColumnData.filter((stakeColumnData) => stakeColumnData.id !== id);

    const stakeToRemove = stakesColumnData.filter((stakeColumnData) => stakeColumnData.id === id)[0];

    const inflation = stakeToRemove.fenix * (1 + FENIX_INFLATION) ** (stakeToRemove.term / YEAR_DAYS);

    let equityPool = 0;
    let totalShares = 0;

    if (newStakeColumnData.length > 0) {
      equityPool = globalData.equityPool - inflation;
      totalShares = globalData.totalShares - stakeToRemove.shares;
    }

    setGlobalData({ ...globalData, equityPool, totalShares });

    setStakesColumnData(newStakeColumnData);
  };
  useEffect(() => {}, [globalData]);

  return (
    <main className="mx-auto max-w-7xl">
      <div className="mx-auto py-8 flex justify-center space-x-2 items-center">
        <Image className="h-10 w-auto" src="/images/fenix-logo.svg" alt="" width={32} height={32} />
        <FenixCalcText className="primary-text w-48 h-6" />
      </div>
      <dl className="mx-auto grid grid-cols-1 gap-px lg:grid-cols-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 primary-card px-4 py-10 sm:px-6 xl:px-8">
          <dt className="text-sm font-medium leading-6 secondary-text">Reward Pool</dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight primary-text">
            <form onSubmit={handleSubmitRewardPool(onUpdateRewardPool)} className="flex flex-row">
              <div className="flex flex-row space-x-2">
                <input
                  className="w-64 primary-input"
                  type="number"
                  step="any"
                  placeholder="0"
                  {...registerRewardPool("rewardPool", { required: true })}
                />
                <button
                  type="submit"
                  className="block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 primary-button"
                >
                  Update
                </button>
              </div>
            </form>
          </dd>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 primary-card  px-4 py-10 sm:px-6 xl:px-8">
          <dt className="text-sm font-medium leading-6 secondary-text">Equity Pool</dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight primary-text">
            {globalData.equityPool}
          </dd>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 primary-card  px-4 py-10 sm:px-6 xl:px-8">
          <dt className="text-sm font-medium leading-6 secondary-text">Total Shares</dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight primary-text">
            {globalData.totalShares}
          </dd>
        </div>
      </dl>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 primary-text">Stakes</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <form onSubmit={handleSubmitStake(onSubmitStake)} className="flex flex-row space-x-2">
              <input
                className="primary-input"
                type="number"
                step="any"
                placeholder="FENIX"
                {...register("fenix", { required: true })}
              />
              <input
                className="primary-input"
                type="number"
                placeholder="TERM"
                {...register("term", { required: true })}
              />
              <button
                type="submit"
                className="block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 primary-button"
              >
                Add Stake
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y primary-divide">
                <StakeHeaderFooter />
                <tbody className="divide-y primary-divide">
                  {stakesColumnData.map((stakeColumnData) => (
                    <tr key={stakeColumnData.id}>
                      <StakeRow stakeColumnData={stakeColumnData} globalData={globalData} removeStake={removeStake} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
