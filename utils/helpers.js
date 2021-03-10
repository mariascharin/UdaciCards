import React from 'react'

export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}

export function setDailyReminder () {
    return "👋 You haven't done your daily quiz yet! \nRemember to keep learning 👋"
}

export function setDailyEncouragement () {
    return "🙌 Your daily quiz is completed! Well done! 🙌 "
}
