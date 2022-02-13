import React, {useState} from 'react';
import { useEffect } from 'react';
import { getRecapAPI } from '../Services/API';
import { PieChart, Pie, Cell, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import styled from 'styled-components';


const RADIAN = Math.PI / 180;

// create a objet for all emotion and their color
const COLORS = {
    "happy": "#00C853",
    "sad": "#FF5252",
    "angry": "#FF1744",
    "neutral": "#FFA000",
    "excited": "#FFC107",
    "stressed": "#6d6a5f",
    "bored": "#0091EA",
    "lonely": "#9bdaf7",
    "hopeful": "#00E676",
    "disgusted": "#00E5FF",
    "optimistic": "#B388FF",
    "nervous": "#BDBDBD",
    "anxious": "#995f5f",
    "other": "#9c39d6",
    "tired": "#77678b",
    "scared": "#414141",
}

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

const Recap = () => {
    
    const [range, setRange]= useState("month");
    const [stats, setStats]= useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [statsNote, setStatsNote] = useState([]);
    
    const getStats = async (range) => {
        let data = await getRecapAPI(range);
        setStats(data);
        if (!isLoaded){
            setIsLoaded(true);
        }
    }

    const getNoteStats = (data) => {
        let note = [];

        {Object.entries(data).map(([index, value]) => {
            note.push({"name":index, note:value.averageNote});
        })}

        return note;
        
    }
    const getWordsStats = (data) => {
        let note = [];

        {Object.entries(data).map(([index, value]) => {
            note.push({"name":index, words:value.averageWordDescription});
        })}
        return note;
        
    }
    const getMoodStats = (data) => {
        let stats = []
        if (data !== 0){
            Object.entries(data.amoutMood).forEach(([index, value]) => {
                stats.push({name: index, value: value})
            })
        } else {
            stats.push({name: "", value: 0})
        }
        return stats
    }
    const YearRange = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const MonthRange = ["week 4", "week 3", "week 2", "week 1"]
    const WeekRange = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    const displayDate = (index) =>{
        let today = new Date();

        if (range == "year"){
            let day = new Date(today.getFullYear(), today.getMonth() - (index-1), today.getDate()).getMonth();
            return <p>{YearRange[day]}</p>;

        } else if (range == "month"){
            return <p>{MonthRange[index-1]}</p>;
            
        } else if (range == "week"){
            let day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - index).getDay();
            return <p>{WeekRange[day]}</p>;
        }
    }
    
    useEffect(() => {
        getStats(range);
        
    }, [range, isLoaded])

    if (stats.length == undefined){
        return (
            <div>
                <h1>Recap</h1>
                <div>
                    <button onClick={() => setRange("month")}>Month</button>
                    <button onClick={() => setRange("week")}>Week</button>
                    <button onClick={() => setRange("year")}>Year</button>
                    <button onClick={() => setRange("all")}>All</button>
                </div>
                <div>
                    <div>
                        <h2>Moods</h2>
                        <div style={{display:"flex"}}>
                            {Object.entries(COLORS).map((index, color) => {
                                return(
                                    <div style={{width:"70px", display:"flex", flexDirection:"column", alignItems:"center"}}>
                                        <div style={{backgroundColor: index[1], width:"20px", height: "20px"}} />
                                        <p>{index[0]}</p>
                                    </div>
                                )

                            })}
                        </div>
                        <ContainerCharts>
                            {Object.entries(stats).map(([index, value]) => {
                                return (
                                    <div>
                                        <div>{displayDate(index)}</div>
                                        <PieChart width={200} height={200}>
                                            <Pie
                                                data={getMoodStats(value)}
                                                cx={100}
                                                cy={100}
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                >
                                                {value !== 0 && Object.entries(value.amoutMood).map(([indexCell, valueCell]) => {
                                                    console.log(indexCell);
                                                    return <Cell key={`cell-${indexCell}`} fill={COLORS[indexCell]} />
                                                })}
                                            </Pie>
                                        </PieChart> 
                                    </div>
                                )

                            })}
                        </ContainerCharts>
                    </div>
                    <div style={{display:"flex", marginTop:"50px"}}>
                        <h2>Notes</h2>
                        <div>
                            <LineChart
                                width={500}
                                height={300}
                                data={getNoteStats(stats)}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="note"
                                    stroke="#8884d8"
                                    activeDot={{ r: 10 }}
                                />
                            </LineChart>
                        </div>
                        <h2>Words amount</h2>
                        <div>
                            <LineChart
                                width={500}
                                height={300}
                                data={getWordsStats(stats)}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="words"
                                    stroke="#e74545"
                                />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div>
                <div>
                    <button onClick={()=>{setRange("week")}}>Week</button>
                    <button onClick={()=>{setRange("month")}}>Month</button>
                    <button onClick={()=>{setRange("year")}}>Year</button>
                </div>
            </div>
        );
    }
};

const ContainerCharts = styled.div`
    display: flex;
    flex-wrap: wrap;
    `

export default Recap;
