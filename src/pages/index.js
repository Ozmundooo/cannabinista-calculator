import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function Home() {
  const [start, setStart] = useState(0);

  const [startingAmount, setStartingAmount] = useState(1);
  const [thcPercent, setTHCPercent] = useState(1);
  const [cbdPercent, setCBDPercent] = useState(2);

  const [teaspoonsUsed, setTeaspoonsUsed] = useState(5);
  const [totalServings, setTotalServings] = useState(10);
  const [potencyResults, setPotencyResults] = useState({
    totalTHC: 0,
    totalCBD: 0,
    totalTHCPerTeaspoon: 0,
    totalCBDPerTeaspoon: 0,
  });

  // Function to calculate potency results
  const calculatePotency = () => {
    // Your potency calculation logic here
    // This is just a placeholder for demonstration purposes
    const totalTHC = startingAmount * thcPercent; // Replace with actual calculation
    const totalCBD = startingAmount * cbdPercent; // Replace with actual calculation
    const totalTHCPerTeaspoon = totalTHC / teaspoonsUsed; // Replace with actual calculation
    const totalCBDPerTeaspoon = totalCBD / teaspoonsUsed; // Replace with actual calculation

    // Return the calculated values
    return {
      totalTHC,
      totalCBD,
      totalTHCPerTeaspoon,
      totalCBDPerTeaspoon,
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
    <main className="min-h-screen bg-secondary">
      <h1
        className={
          start !== 0
            ? "text-center pt-10 text-5xl font-title text-transparent tracking-tighter duration-1000 opacity-100 "
            : "text-center pt-10 text-5xl font-title text-transparent  tracking-widest duration-1000 opacity-0"
        }
      >
        Marijuana Mathematics
      </h1>
      <section className="">
        <div>
          <motion.form
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="mx-6 my-5 bg-tertiary p-5 rounded-2xl font-subtitle"
            onSubmit={handleSubmit}
          >
            <h2 className="font-title text-white text-2xl my-1">
              Step 1: Calculate Potency For the Entire Batch
            </h2>
            <div className="flex flex-col my-2">
              <label
                className="font-subtitle text-white text-lg my-1"
                htmlFor="startingAmount"
              >
                Starting Amount of Cannabis Product in Grams (g)
              </label>
              <input
                type="number"
                id="startingAmount"
                className="py-2 pl-2 bg-transparent text-white border-b-2 focus:py-3 duration-500"
                value={startingAmount}
                onChange={(e) => setStartingAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                htmlFor="thcPercent"
                className="font-subtitle text-white text-lg my-1"
              >
                THC/THCA %
              </label>
              <input
                type="number"
                id="thcPercent"
                className="py-2 pl-2 bg-transparent text-white border-b-2 focus:py-3 duration-500"
                value={thcPercent}
                onChange={(e) => setTHCPercent(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                className="font-subtitle text-white text-lg my-1"
                htmlFor="cbdPercent"
              >
                CBD/CBDA %
              </label>
              <input
                type="number"
                className="py-2 pl-2 bg-transparent text-white border-b-2 focus:py-3 duration-500"
                id="cbdPercent"
                value={cbdPercent}
                onChange={(e) => setCBDPercent(e.target.value)}
              />
            </div>
            {/* 
            <h2 className="font-title text-white text-2xl my-1">
              Step 2: Creation Portions/Servings
            </h2>
            <div className="flex flex-col my-2">
              <label
                className="font-subtitle text-white text-lg my-1"
                htmlFor="teaspoonsUsed"
              >
                Number of Teaspoons Used in Your Recipe
              </label>
              <input
                type="number"
                className="py-2 pl-2 bg-transparent text-white border-b-2 focus:py-3 duration-500"
                id="teaspoonsUsed"
                value={teaspoonsUsed}
                onChange={(e) => setTeaspoonsUsed(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-2">
              <label
                className="font-subtitle text-white text-lg my-1"
                htmlFor="totalServings"
              >
                Total Number of Servings In your Recipe
              </label>
              <input
                type="number"
                className="py-2 pl-2 bg-transparent text-white border-b-2 focus:py-3 duration-500"
                id="totalServings"
                value={totalServings}
                onChange={(e) => setTotalServings(e.target.value)}
              />
            </div> */}

            <button
              className="my-3 border-white border-2 py-2 px-6 rounded-md text-white font-subtitle text-xl hover:bg-secondary hover:border-secondary duration-700"
              type="submit"
            >
              Calculate
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ ease: "easeIn", duration: 1 }}
            className="mx-6 my-5 bg-tertiary p-5 rounded-2xl font-subtitle "
          >
            <h2 className="font-title text-white text-2xl my-1">
              Potency Results
            </h2>
            <p className="font-subtitle text-white text-lg my-1">
              Total mg of THC: {potencyResults.totalTHC}
              <span className="text-sm">mg</span>
            </p>
            <p className="font-subtitle text-white text-lg my-1">
              Total mg of CBD: {potencyResults.totalCBD}
              <span className="text-sm">mg</span>
            </p>
            <p className="font-subtitle text-white text-lg my-1">
              Total mg of THC per teaspoon: {potencyResults.totalTHCPerTeaspoon}
              <span className="text-sm">mg</span>
            </p>
            <p className="font-subtitle text-white text-lg my-1">
              Total mg of CBD per teaspoon: {potencyResults.totalCBDPerTeaspoon}
              <span className="text-sm">mg</span>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
