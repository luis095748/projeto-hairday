import dayjs from "dayjs";
import { apiConfig } from "./api-config.js"

export async function scheduleFetchByDay({ date }) {
  try {
    // fazendo a requisição
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    const data = await response.json()

    const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"))

    const dailySchedulesByHour = dailySchedules.sort((a, b) => {
      const hourA = dayjs(a.when).hour()
      const hourB = dayjs(b.when).hour()

      return hourA - hourB
    })

    return dailySchedules
  } catch (error) {
    console.log(error);
    alert("Não foi possível agendar, tente novamente mais tarde.")
  }
}