import {Legend, PieChart, Pie, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGenders} = props
  console.log('dd', vaccinationByGenders)

  return (
    <div className="bg">
      <h1>Vaccination by Gender</h1>
      <PieChart width={730} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationByGenders}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill=" #5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
