import {Legend, PieChart, Pie, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAges} = props
  const data = vaccinationByAges.map(item => ({
    age: item.age,
    count: item.count,
  }))
  console.log(data)

  return (
    <div>
      <h1>Vaccination by Age</h1>
      <PieChart width={730} height={250}>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
