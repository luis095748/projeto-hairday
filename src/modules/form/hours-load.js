import dayjs from "dayjs"

import { openingHours } from "../../utils/opening-hours"
import { hoursClick } from "./hours-click"

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }) {
  // Limpa a lista
  hours.innerHTML = ""
  //Obtém a lista de horários ocupados
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

  const opening = openingHours.map((hour) => {

    // Recupera somente a hora
    const [schedulesHour] = hour.split(":")

    // Adiciona a hora na data e verifica se está no passado
    const isHourPast = dayjs(date).add(schedulesHour, "hour").isBefore(dayjs())

    //Verifica se o horário está ocupado e se já passou
    const available = !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available
    }
  })


  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    switch (hour) {
      case "09:00":
        hourHeaderAdd("Manhã")
        break;

      case "13:00":
        hourHeaderAdd("Tarde")
        break;

      case "18:00":
        hourHeaderAdd("Noite")
        break;
    }

    hours.append(li)
  })

  hoursClick()
}

function hourHeaderAdd(title) {
  const header = document.createElement("li")

  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}