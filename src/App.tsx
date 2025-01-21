import './App.css'
import moment from "moment"
import {useEffect, useState} from "react";

const weeks = ["월", "화", "수", "목", "금", "토", "일"];
const days = [1, 2, 3, 4, 5, 6, 7];


function App() {
    const [getDay, setDay] = useState(moment().format('YYYY-MM-DD'));
    // 1년은 52주
    const today = moment(getDay);
    const todayStartWeekend = today.clone().day(); // 월요일이면 0
    const endDate = today.clone().endOf("month").date();
    const monthWeeksNum = Math.floor(endDate / 7 + (endDate % 7 > 0 ? 1 : 0))

    const startWeek  = today.clone().startOf("month") // 해당 달의 첫번째 날 가져오기 ( ex. 2024-05-01 )
    const endWeek = today.clone().endOf("month") // 해당 달의 마지막날 가져오기

    const monthWeeks = () => {
        const arr = [];
        for (let i = 0 ; i < monthWeeksNum ; i ++){
            arr.push(i)
        }
        return arr;
    }

    const totalDays = () => {
        const arr = [];
        for (let i = 0 ; i < 7 ; i ++){
            arr.push(i)
        }
        return arr;
    }

    return (
        <>
            <div>
                <div className="header">
                    <div>ㄱ</div>
                    <div>2025년</div>
                    <div>버튼1</div>
                    <div>버튼2</div>
                    <div>버튼3</div>
                </div>

                <div className="monthBox">
                    <div>
                        오늘 날짜: {today.year()} 년 {today.month()+1} 월 {today.date()} 일
                    </div>
                </div>

                <div className='weekName'>
                    {weeks.map((week, index) => (
                        <div key={index}>
                            {week}
                        </div>
                    ))}
                </div>
                <div className='day'>
                    {
                        monthWeeks().map((week, weekIdx) => {

                            return (
                                <div>
                                    {
                                        totalDays().map((day, index) => {
                                            if (weekIdx == 0) {
                                                // 첫번째 줄
                                                // 해당 요일의 숫자 이상이여야 값이 나오도록 한다
                                                if (todayStartWeekend <= index) {
                                                    return <div>{day - todayStartWeekend + 1}   </div>;
                                                }
                                                return <div></div>
                                            }
                                            else if (day - todayStartWeekend + 1 + 7 * weekIdx > endWeek.date()) {
                                                return <div></div>
                                            }
                                            return <div>{day - todayStartWeekend + 1 + 7 * weekIdx} </div>

                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default App
