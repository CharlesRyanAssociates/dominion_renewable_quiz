import React from 'react'
import Question from './question'
import questions from './questions.json';
import results from './results.json';
import summaries from './summaries.json';

function arrayMatch(first, last){
  return JSON.stringify(first) === JSON.stringify(last);
}

function App(props) {
  const [answers, setAnswers] = React.useState({});
  const [answerNums, setAnswerNums] = React.useState([]);
  const [summaryData, setSummaryData] = React.useState([]);
  const [current, setCurrent] = React.useState(0);
  const [view, setView] = React.useState('quiz');

  const {
    assetURL, 
    calculatorURL
  } = props;
  
  const titles = {
    recSelect: "REC Select",
    renewable: "100% Renewable Energy",
    greenPower: "Green Power",
    solar: "Community Solar"
  }

  const servicesOrdered = [
    'renewable', 'recSelect', 'greenPower', 'solar'
  ]

  function resetQuiz(){
    setCurrent(0);
    setView('quiz');
    setAnswers({})
    setAnswerNums([]);
    setSummaryData([]);
  }

  function submitAnswer(ques, res, sum, num){
    setAnswers({...answers, [ques]: res });
    setSummaryData([...summaryData, sum]);
    setAnswerNums([...answerNums, num]);

    if( current < (questions.length - 1) ){
      setCurrent(current + 1);
    }else{
      setView('results');
    }
  }


  function buildMessages(){
    const msg  = [];
    const summaryList = [...new Set(summaryData)];

    summaryList.forEach( e => {
      if( ( 
        arrayMatch(answerNums, [1,1,1,1]) || 
        arrayMatch(answerNums, [1,1,1,3]) ||
        arrayMatch(answerNums, [3,1,1,1]) ||
        arrayMatch(answerNums, [3,1,1,2]) ||
        arrayMatch(answerNums, [3,1,1,3])
        ) && e === '3-1' ){
          return;
      }

      if( ( 
        arrayMatch(answerNums, [3,2,1,1]) || 
        arrayMatch(answerNums, [3,2,1,2]) ||
        arrayMatch(answerNums, [3,2,1,3])
        ) && e === '1-3' ){
          return;
      }

      msg.push(summaries[e]);
    });

    return msg;
  }


  function getResults(){
    const values = Object.values(answers).flat();
    const counts = {};
    
    values.forEach(v => {
      if( counts[v] === undefined ) counts[v] = 0;
      counts[v] = counts[v] + 1;
    });    
    
    const results = values.sort((a,b) => 
      values.filter(v => v===a).length - values.filter(v => v===b).length
    ).reverse();

    console.log({ answers, values, counts, results });

    buildMessages();

    console.log({ sortedAnswers: results });

    return results.filter( res => {
      const first = results[0];
      return counts[res] === counts[first];
    });

  }
  

  // function getResults(){
  //   return Object.values(answers).flat();
  // }

  if( view === 'results' ){
    const result   = getResults();
    const messages = buildMessages()
    const str = messages.length > 0 ? " because you" : "";
    
    return (
      <div className="container">
        <div className="rich-text border p-5">
          <h4 className="h2 py-2">Based on your answers, we recommend the below program(s) {str}:</h4>
          { messages.length > 0 && 
          <ul className='mb-4'>
            { messages.map((m,k) => 
            <li key={k}>{m}</li>  
            )}
          </ul> }
          <ul className="list-unstyled d-flex flex-wrap" style={{ listStyle: "none", padding: "0px" }}>
          { servicesOrdered.filter(s => result.includes(s)).map( s => {
            const res = results[s];
            return (
              <li key={s} className="text-center">
                <a href={res.link} target="_blank"><img src={`${assetURL}/${res.icon}`} width="160" /></a>
                <span className="d-block">{titles[s]}</span>
              </li>
            );
          })}
          </ul>
          <div className="pt-4 d-flex mb-4">
            <button type="button" className="button" onClick={resetQuiz}>Retake The Quiz</button>
            <a href={calculatorURL} className='button ml-2'>Calculate Your Monthly Cost</a>
          </div>
          <h3 className="mb-3">Learn more about our entire suite of renewable programs:</h3>
          { servicesOrdered.map( s => (
            <p key={s}><strong className="text-primary"><a href={results[s].link} target="_blank">{titles[s]}:</a></strong> {results[s]?.text}</p>
          ))}
          <h4 className="pt-2 mb-3">Interested in renewable energy for your electric vehicle?</h4>
          <p>On average, Americans drive about 30 miles per day, which requires around 10kWh to drive in an electric vehicle (EV). That equates to about 300kWh per month. Offset the electricity used to charge your EV with renewable energy!</p>
        </div>
      </div>
    )
  }


  return (
    <div className="container">
        {questions.map((q, i) => 
          <Question 
            key={i} {...q} 
            index={i+1} 
            assetURL={assetURL} 
            count={questions.length} 
            visible={i === current} 
            back={e => setCurrent( current - 1)} 
            submit={submitAnswer} 
          />)}
    </div>
  );
}

export default App;
