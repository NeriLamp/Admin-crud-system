import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function AgeBarChart({ listOfUsers }) {
  // Grupavimo funkcija, kuri skaičiuoja kiek kartų kiekvienas amžius pasikartoja
  const ageCount = listOfUsers.reduce((acc, user) => {
    // Jei toks amžius jau yra, padidiname jo skaičių
    if (acc[user.age]) {
      acc[user.age] += 1;
    } else {
      // Jei amžiaus dar nėra, pridedame naują įrašą
      acc[user.age] = 1;
    }
    return acc;
  }, {});

  // Paverčiame amžių ir jų skaičius į masyvą
  const data = Object.keys(ageCount).map(age => ({
    age: age,
    count: ageCount[age]
  }));

  return (
    <div>
      <h2>Vartotojų amžių grafikas</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default AgeBarChart;
