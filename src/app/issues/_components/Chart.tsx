'use client'
import React from 'react'
import { Card } from '@radix-ui/themes'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface IChartProps {
  open: number
  inProgress: number
  closed: number
}

const Chart = ({ open, closed, inProgress }: IChartProps) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'Closed', value: closed },
    { label: 'In Progress', value: inProgress },
  ]

  return (
    <Card >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={50} style={{fill: "var(--green-9)"}}/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default Chart
