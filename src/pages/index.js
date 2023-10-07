import Image from "next/image";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Head from "next/head";
export default function Home() {
  const [start, setStart] = useState(0);

  const [startingAmount, setStartingAmount] = useState(1);
  const [thcPercent, setTHCPercent] = useState(1);
  const [cbdPercent, setCBDPercent] = useState(1);
  const [cups, setCups] = useState("1/16");
  const [cupsToTablespoons, setCupsToTablespoons] = useState(1.0);
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
  const cupOptions = ["1/16", "1/8", "1/4", "1/2", "1", "2"];
  // Function to calculate potency results
  const calculatePotency = () => {
    // Your potency calculation logic here
    // This is just a placeholder for demonstration purposes
    const totalTHC = ((startingAmount * thcPercent) / 100) * 1000; // Replace with actual calculation
    const totalCBD = ((startingAmount * cbdPercent) / 100) * 1000; // Replace with actual calculation

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
  }, []);
  return (
    <>
      <Head>
        <title>Marijuana Mathematics</title>
        <meta
          name="description"
          content="Calculate potency for your infused products."
        />
        {/* Add any additional meta tags or links to CSS/JS files here */}
      </Head>
      <main className="min-h-screen bg-secondary lg:my-auto">
        <h1
          className={
            start !== 0
              ? "text-center pt-10 text-5xl lg:text-7xl font-title text-transparent tracking-tighter duration-1000 opacity-100 "
              : "text-center pt-10 text-5xl lg:text-7xl font-title text-transparent  tracking-widest duration-1000 opacity-0"
          }
        >
          Marijuana Mathematics
        </h1>
        <section className=" lg:my-auto">
          <div className="xl:flex xl:flex-row xl:mx-10 2xl:mx-40">
            <motion.form
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 100, y: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="mx-6 my-5 bg-tertiary p-5 rounded-2xl font-subtitle xl:w-3/4"
              onSubmit={handleSubmit}
            >
              <h2 className="font-title text-white text-2xl lg:text-4xl my-1 lg:text-center  lg:mx-auto">
                Step 1: Calculate Potency For the Entire Batch
              </h2>
              <p className="text-sm lg:text-base text-white lg:text-center lg:w-3/4 lg:mx-auto mt-2">
                Calculate total batch potency by entering product weight
                (grams), THC/THCA percentage, and CBD/CBDA percentage. Get total
                THC and CBD in milligrams (mg) for dosing.
              </p>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <div className="w-full">
                  <label
                    className="font-subtitle text-white text-lg lg:text-xl w-full my-auto"
                    htmlFor="startingAmount"
                  >
                    Grams of product
                  </label>
                  <p className="text-sm lg:text-base text-white opacity-60">
                    (Can be flower, wax, oil, etc)
                  </p>
                </div>

                <input
                  type="number"
                  id="startingAmount"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  value={startingAmount}
                  onChange={(e) => setStartingAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <label
                  htmlFor="thcPercent"
                  className="font-subtitle text-white text-lg lg:text-xl w-full my-auto"
                >
                  THC/THCA %
                </label>
                <input
                  type="number"
                  id="thcPercent"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  value={thcPercent}
                  onChange={(e) => setTHCPercent(e.target.value)}
                />
              </div>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <label
                  className="font-subtitle text-white text-lg lg:text-xl w-full my-auto"
                  htmlFor="cbdPercent"
                >
                  CBD/CBDA %
                </label>
                <input
                  type="number"
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  id="cbdPercent"
                  value={cbdPercent}
                  onChange={(e) => setCBDPercent(e.target.value)}
                />
              </div>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <div className="w-full">
                  <label
                    className="font-subtitle text-white text-lg lg:text-xl w-full my-auto"
                    htmlFor="startingAmount"
                  >
                    Cups of Oil, Alcohol, or Fat
                  </label>
                  <p className="text-sm lg:text-base text-white opacity-60">
                    (Butter / Lecithin) For Infusion*
                  </p>
                </div>

                <select
                  className="w-[100px] lg:w-[150px] py-2 pl-3 bg-gray text-black h-12 text-xl my-auto rounded-md"
                  onChange={(e) => setCups(e.target.value)}
                >
                  {cupOptions.map((option, index) => (
                    <option
                      className="text-black font-subtext"
                      key={index}
                      value={option.toLowerCase()}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <h2 className="font-title text-white text-2xl lg:text-4xl my-1 lg:text-center  lg:mx-auto">
                Step 2: Creation Portions/Servings
              </h2>
              <p className="text-sm lg:text-base text-white lg:text-center lg:w-3/4 lg:mx-auto mt-2">
                Determine the potency per serving in your recipe by specifying
                the number of tablespoons of oil and the total servings. This
                calculation will yield the milligrams (mg) of THC and CBD in the
                entire recipe, as well as the amount per serving
              </p>
              <div className="flex flex-row my-2 gap-5 justify-between">
                <label
                  className="font-subtitle text-white text-lg lg:text-xl w-full my-auto"
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
                  className="font-subtitle text-white text-lg lg:text-xl w-full my-auto"
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
              <button
                className="my-3 w-full border-2 py-2 px-6 rounded-md text-white font-subtitle text-xl bg-secondary border-secondary duration-700"
                type="submit"
              >
                Calculate
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 100, y: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
              className="mx-6 my-5 bg-primary p-5 rounded-2xl font-subtitle xl:w-1/4 "
            >
              <div className="  rounded-lg  text-secondary ">
                <h2 className="font-title  text-2xl my-1">Results</h2>
                <div className="flex flex-row justify-between my-2 gap-5  font-subtitle text-xl">
                  <p className="my-auto">Total mg of THC</p>
                  <p className="font-medium text-2xl my-auto">
                    <CountUp
                      decimals={2}
                      duration={0.3}
                      end={potencyResults.totalTHC}
                    />
                    <span className="text-sm font-light">mg</span>
                  </p>
                </div>
                <div className="flex flex-row justify-between my-2 gap-5  font-subtitle text-xl ">
                  <p className="my-auto">Total mg of CBD</p>
                  <p className="font-medium text-2xl my-auto">
                    <CountUp
                      decimals={2}
                      duration={0.5}
                      end={potencyResults.totalCBD}
                    />

                    <span className="text-sm font-light">mg</span>
                  </p>
                </div>
                <div className="flex flex-row justify-between my-2 gap-5  font-subtitle text-xl ">
                  <p className="my-auto">Total mg of THC per tablespoon</p>
                  <p className="font-medium text-2xl my-auto">
                    <CountUp
                      decimals={2}
                      duration={0.5}
                      end={potencyResults.totalTHCPerTablespoon}
                    />

                    <span className="text-sm font-light">mg</span>
                  </p>
                </div>
                <div className="flex flex-row justify-between my-2 gap-5  font-subtitle text-xl ">
                  <p className="my-auto">Total mg of CBD per tablespoon</p>
                  <p className="font-medium text-2xl my-auto">
                    <CountUp
                      decimals={2}
                      duration={0.5}
                      end={potencyResults.totalCBDPerTablespoon}
                    />

                    <span className="text-sm font-light">mg</span>
                  </p>
                </div>
                <div className="flex flex-row justify-between my-2 gap-5  font-subtitle text-xl">
                  <p className="my-auto">Total mg of THC in entire recipe</p>
                  <p className="font-medium text-2xl my-auto">
                    <CountUp
                      decimals={2}
                      duration={0.3}
                      end={potencyResults.totalTHCPerServings}
                    />
                    <span className="text-sm font-light">mg</span>
                  </p>
                </div>
                <div className="flex flex-row justify-between my-2 gap-5  font-subtitle text-xl ">
                  <p className="my-auto">Total mg of CBD in entire recipe</p>
                  <p className="font-medium text-2xl my-auto">
                    <CountUp
                      decimals={2}
                      duration={0.5}
                      end={potencyResults.totalCBDPerServings}
                    />

                    <span className="text-sm font-light">mg</span>
                  </p>
                </div>
                <div className="flex flex-row justify-between my-2 gap-5 font-subtitle text-xl ">
                  <p className="my-auto">Total mg of THC in per serving</p>
                  <p className="font-medium text-2xl my-auto">
                    <CountUp
                      decimals={2}
                      duration={0.5}
                      end={potencyResults.totalTHCPerServings / totalServings}
                    />

                    <span className="text-sm font-light">mg</span>
                  </p>
                </div>
                <div className="flex flex-row justify-between my-2 gap-5  font-subtitle text-xl ">
                  <p className="my-auto">Total mg of CBD per serving</p>
                  <p className="font-medium text-2xl my-auto">
                    <CountUp
                      decimals={2}
                      duration={0.5}
                      end={potencyResults.totalCBDPerServings / totalServings}
                    />

                    <span className="text-sm font-light">mg</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
