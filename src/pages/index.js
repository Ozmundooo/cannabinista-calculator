import Image from "next/image";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Head from "next/head";
import cannabinistaLogo from "../assets/cannabinista.jpg";
export default function Home() {
  const [start, setStart] = useState(0);

  const [startingAmount, setStartingAmount] = useState(1);
  const [thcPercent, setTHCPercent] = useState(1);
  const [cbdPercent, setCBDPercent] = useState(1);
  const [cups, setCups] = useState(1);
  const [checkedDecarboxylation, setCheckedDecarboxylation] = useState(false);
  const [tablespoonsUsed, setTablespoonUsed] = useState(1);
  const [totalServings, setTotalServings] = useState(1);
  const [potencyResults, setPotencyResults] = useState({
    totalTHC: 0,
    totalCBD: 0,
    totalTHCPerTablespoon: 0,
    totalCBDPerTablespoon: 0,
    totalTHCPerServings: 0,
    totalCBDPerServings: 0,
  });

  // Function to calculate potency results
  const calculatePotency = () => {
    // Your potency calculation logic here
    // This is just a placeholder for demonstration purposes
    const totalTHC =
      ((startingAmount * thcPercent) / 100) *
      1000 *
      (checkedDecarboxylation ? 0.877 : 1); // Replace with actual calculation
    const totalCBD =
      ((startingAmount * cbdPercent) / 100) *
      1000 *
      (checkedDecarboxylation ? 0.877 : 1); // Replace with actual calculation

    const totalTHCPerTablespoon = totalTHC * (1 / (eval(cups) / (1 / 16))); // Replace with actual calculation
    const totalCBDPerTablespoon = totalCBD * (1 / (eval(cups) / (1 / 16))); // Replace with actual calculation
    const totalTHCPerServings =
      ((totalTHC / totalServings) * totalTHCPerTablespoon) / totalServings;
    const totalCBDPerServings =
      ((totalCBD / totalServings) * totalCBDPerTablespoon) / totalServings;
    // Return the calculated values
    return {
      totalTHC,
      totalCBD,
      totalTHCPerTablespoon,
      totalCBDPerTablespoon,
      totalTHCPerServings,
      totalCBDPerServings,
    };
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the calculatePotency function and update state with the results
    const results = calculatePotency();
    setPotencyResults(results);
  };

  useEffect(() => {
    const results = calculatePotency();
    setPotencyResults(results);
    setTimeout(() => {
      setStart(1);
    }, 500);
  }, [checkedDecarboxylation, startingAmount, thcPercent, cbdPercent, cups]);
  return (
    <>
      <Head>
        <title>cannabinista - Marijuana Mathematics</title>
        <meta
          name="description"
          content="Calculate potency for your infused products."
        />
        <meta property="og:image" content="/canabinista.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Add any additional meta tags or links to CSS/JS files here */}
      </Head>
      <main className="min-h-screen bg-white lg:my-auto">
        <Image
          className="mx-auto my-6 h-32 lg:h-36 w-auto"
          src={cannabinistaLogo}
        />

        <section className=" lg:my-auto">
          <div className="xl:flex xl:flex-row xl:mx-10 2xl:mx-40">
            <motion.form
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 100, y: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="mx-6 my-5 bg-[#F3F0EB] p-5 rounded-2xl font-subtitle "
              onSubmit={handleSubmit}
            >
              <h2 className="font-title font-semibold text-black text-2xl lg:text-4xl my-5 mb-1 lg:text-center  lg:mx-auto">
                Step 1: Calculate Potency For Your Infusion
              </h2>
              <p className=" text-sm lg:text-base text-black lg:text-center w-5/6 lg:w-3/4 lg:mx-auto my-2 mt-1 ">
                Calculate total batch potency by entering product weight
                (grams), THC/THCA percentage, and CBD/CBDA percentage. Get total
                THC and CBD in milligrams (mg) for dosing.
              </p>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <div className="w-full">
                  <label
                    className="font-subtitle font-medium text-black text-lg lg:text-xl w-full my-auto"
                    htmlFor="startingAmount"
                  >
                    Starting amount of cannabis flower in grams
                  </label>
                  <p className="text-sm lg:text-base text-black opacity-60">
                    (Can be flower, wax, oil, etc)
                  </p>
                </div>

                <input
                  type="number"
                  id="startingAmount"
                  step="0.000001"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  value={startingAmount}
                  onChange={(e) => setStartingAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <div className="w-full">
                  <label
                    className="font-subtitle font-medium text-black text-lg lg:text-xl w-full my-auto"
                    htmlFor="thcPercent"
                  >
                    THC/THCA %
                  </label>
                  <p className="text-sm lg:text-base text-black opacity-60 lg:w-3/4">
                    THC (tetrahydrocannabinol) is the psychoactive compound in
                    cannabis, while THCA (tetrahydrocannabinolic acid) is its
                    non-psychoactive precursor found in raw cannabis.
                  </p>
                </div>
                <input
                  type="number"
                  id="thcPercent"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  value={thcPercent}
                  onChange={(e) => setTHCPercent(e.target.value)}
                />
              </div>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <div className="w-full">
                  <label
                    className="font-subtitle font-medium text-black text-lg lg:text-xl w-full my-auto"
                    htmlFor="cbdPercent"
                  >
                    CBD/CBDA %
                  </label>
                  <p className="text-sm lg:text-base text-black opacity-60 lg:w-3/4">
                    CBD (cannabidiol) is a psychoactive compound in cannabis
                    known for its potential therapeutic benefits, while CBDA
                    (cannabidiolic acid) is the precursor to CBD found in raw
                    cannabis, which needs to be decarboxylated (heated) to
                    become CBD with active properties.
                  </p>
                </div>
                <input
                  type="number"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  id="cbdPercent"
                  value={cbdPercent}
                  onChange={(e) => setCBDPercent(e.target.value)}
                />
              </div>
              <div className="flex flex-row my-2 mb-5 gap-5 justify-between">
                <div className="w-full">
                  <label
                    className="font-subtitle text-black text-lg lg:text-xl w-full my-auto"
                    htmlFor="startingAmount"
                  >
                    Amount of infusion liquid in cups
                  </label>
                  <p className="text-sm lg:text-base text-black opacity-60">
                    (ie. butter, olive oil, coconut oil, MCT oil, alcohol)
                  </p>
                </div>

                <input
                  type="number"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  id="cups"
                  step="0.000001"
                  value={cups}
                  onChange={(e) => setCups(e.target.value)}
                />
              </div>
              <div className="flex flex-row my-2 mb-5 gap-5 justify-between">
                <label
                  className="font-subtitle text-black text-lg lg:text-xl w-full my-auto"
                  htmlFor="startingAmount"
                >
                  Account for the loss associated with Decarboxylation?
                </label>

                <input
                  type="checkbox"
                  className="w-[25px]  py-2 pl-3  text-black h-12 text-xl my-auto  "
                  checked={checkedDecarboxylation}
                  onChange={() =>
                    setCheckedDecarboxylation(!checkedDecarboxylation)
                  }
                />
              </div>
              <div className="py-4 mt-4 mb-4 border-y-2">
                <h2 className="font-title font-semibold text-2xl">
                  Potency Results For The Entire Batch
                </h2>
                <table class="table-fixed w-full">
                  <thead>
                    <tr className="font-title font-semibold text-left">
                      <th className=""></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="font-subtitle">
                    <tr className="text-xl">
                      <td>Total mg of THC</td>
                      <td className="font-title font-medium text-2xl my-auto text-right">
                        <CountUp
                          decimals={2}
                          duration={0.3}
                          end={potencyResults.totalTHC}
                        />
                        <span className="text-sm font-light">mg</span>
                      </td>
                    </tr>
                    <tr className="text-xl">
                      <td>Total mg of CBD</td>
                      <td className="font-title font-medium text-2xl my-auto text-right">
                        <CountUp
                          decimals={2}
                          duration={0.3}
                          end={potencyResults.totalCBD}
                        />
                        <span className="text-sm font-light">mg</span>
                      </td>
                    </tr>
                    <tr className="text-xl">
                      <td>Total mg of THC per tablespoon</td>
                      <td className="font-title font-medium text-2xl my-auto text-right">
                        <CountUp
                          decimals={2}
                          duration={0.3}
                          end={potencyResults.totalTHCPerTablespoon}
                        />
                        <span className="text-sm font-light">mg</span>
                      </td>
                    </tr>
                    <tr className="text-xl">
                      <td>Total mg of CBD per tablespoon</td>
                      <td className="font-title font-medium text-2xl my-auto text-right">
                        <CountUp
                          decimals={2}
                          duration={0.3}
                          end={potencyResults.totalCBDPerTablespoon}
                        />
                        <span className="text-sm font-light">mg</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm italic my-2">
                  This calculator is designed to provide an approximation of the
                  dosage of your homemade infusions and may not be 100%
                  accurate. Start low and go slow, and consume responsibly.{" "}
                </p>
              </div>

              <h2 className="font-title font-semibold text-black text-2xl lg:text-4xl my-3 mb-1 lg:text-center  lg:mx-auto">
                Step 2: Calculate Potency Of Each Serving/Edible
              </h2>
              <p className="text-sm lg:text-base text-black lg:text-center w-5/6 lg:w-3/4 lg:mx-auto my-2 mt-1">
                Determine the potency per serving in your recipe by specifying
                the number of tablespoons of oil and the total servings. This
                calculation will yield the milligrams (mg) of THC and CBD in the
                entire recipe, as well as the amount per serving
              </p>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <label
                  className="font-subtitle text-black text-lg lg:text-xl w-full my-auto"
                  htmlFor="tablespoonsUsed"
                >
                  Tablespoons of oil in your recipe
                </label>
                <input
                  type="number"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  id="tablespoonsUsed"
                  value={tablespoonsUsed}
                  onChange={(e) => setTablespoonUsed(e.target.value)}
                />
              </div>
              <div className="flex flex-row my-2 gap-5  justify-between">
                <label
                  className="font-subtitle text-black text-lg lg:text-xl w-full my-auto"
                  htmlFor="totalServings"
                >
                  Servings in your recipe
                </label>
                <input
                  type="number"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl  my-auto rounded-md"
                  id="totalServings"
                  value={totalServings}
                  onChange={(e) => setTotalServings(e.target.value)}
                />
              </div>
              <div className="py-4 mt-4 mb-2 border-y-2">
                <h2 className="font-title font-semibold text-2xl  ">
                  Potency Results Of Each Serving/Edible
                </h2>
                <table class="table-fixed w-full">
                  <thead>
                    <tr className="font-title font-semibold text-left">
                      <th className=""></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="font-subtitle">
                    <tr className="text-xl">
                      <td>Total mg of THC in entire recipe</td>
                      <td className="font-title font-medium text-2xl my-auto text-right">
                        <CountUp
                          decimals={2}
                          duration={0.3}
                          end={
                            potencyResults.totalTHCPerTablespoon *
                            tablespoonsUsed
                          }
                        />
                        <span className="text-sm font-light">mg</span>
                      </td>
                    </tr>
                    <tr className="text-xl">
                      <td>Total mg of CBD in entire recipe</td>
                      <td className="font-title font-medium text-2xl my-auto text-right">
                        <CountUp
                          decimals={2}
                          duration={0.3}
                          end={
                            potencyResults.totalCBDPerTablespoon *
                            tablespoonsUsed
                          }
                        />
                        <span className="text-sm font-light">mg</span>
                      </td>
                    </tr>
                    <tr className="text-xl">
                      <td>Total mg of THC in per serving</td>
                      <td className="font-title font-medium text-2xl my-auto text-right">
                        <CountUp
                          decimals={2}
                          duration={0.3}
                          end={
                            (potencyResults.totalTHCPerTablespoon *
                              tablespoonsUsed) /
                            totalServings
                          }
                        />
                        <span className="text-sm font-light">mg</span>
                      </td>
                    </tr>
                    <tr className="text-xl">
                      <td>Total mg of CBD per serving</td>
                      <td className="font-title font-medium text-2xl my-auto text-right">
                        <CountUp
                          decimals={2}
                          duration={0.3}
                          end={
                            (potencyResults.totalCBDPerTablespoon *
                              tablespoonsUsed) /
                            totalServings
                          }
                        />
                        <span className="text-sm font-light">mg</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm italic my-2">
                  This calculator is designed to provide an approximation of the
                  dosage of your homemade infusions and may not be 100%
                  accurate. Start low and go slow, and consume responsibly.{" "}
                </p>
              </div>

              <button
                className="my-3 w-full  py-3 px-6 rounded-md text-black font-subtitle text-xl bg-[#B1C354]  duration-700"
                type="submit"
              >
                Calculate
              </button>
            </motion.form>

            {/* <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 100, y: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="mx-6 my-5 bg-[#F3F0EB] p-5 rounded-2xl font-subtitle xl:w-1/4 "
            >
              <div className="  rounded-lg  text-black ">
                <h2 className="font-title font-semibold text-2xl my-1 mb-3">
                  Potency Results For The Entire Batch
                </h2>
              </div>
            </motion.div> */}
          </div>
        </section>
      </main>
    </>
  );
}
