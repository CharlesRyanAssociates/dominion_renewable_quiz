import React from 'react'

function Question({ intro, title, index, count, visible, answers, submit, back, assetURL, icon }){
  const [answer, setAnswer] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [answerNum, setAnswerNum] = React.useState(null);
  const name = `question${index}`;
  
  // section-header text-center
  function setAnswerMessage(q, i){
    setMessage(q.message);
    setAnswer(q.results);
    setAnswerNum(i)
  }

  return (
    <>
    { index === 1 && visible === true && (
      <div className={`mb-4 ${index !== 1 ? 'd-none' : 'd-block'}`} id={`${name}_itm`}>
        <h2>Take this quiz to find the premium renewable energy program that is right for you!</h2>
      </div>
    )}
      <div className={`question-cta ${visible === true ? 'd-block' : 'd-none'}`}>
        <div className="border rich-text p-4 mb-4">
          <div className="d-flex">
            <h4 className="d-block text-right ml-auto pl-3 order-2"><span className="sr-only">Question</span> {index}/{count}</h4>            
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: intro }} />
          </div>
          <div className="d-flex align-items-center mb-4">
              <img src={`${assetURL}/${icon}`} width={56} />
              <h3 style={{ fontSize: '1.25rem' }} className="m-0 pl-4">{title}</h3>
          </div>
          <div className="answer-list">
            { answers.map((q, i)=> 
              <label className="border d-flex align-items-center" key={i}>
                <span className="py-2 px-3 bg-primary answer-control">
                  <span className="sr-only"><input type="radio" name={name} onChange={ e => setAnswerMessage(q, i + 1)} /></span>
                  <i className={`fa ${answer === q.results ? 'fa-check' : 'fa-circle'} fa-fw text-white`}></i>
                </span>
                <span className="answer-label d-block pl-3 font-weight-light">{q.title}</span> 
              </label>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
            { index !== 1 && <button type="button" className="button" onClick={back}>Back</button> }
            <button type="button" className="button ml-auto" disabled={answer === null} onClick={e => submit(name, answer, message, answerNum) }>Next</button>
        </div>
      </div>
    </>
  );
}

export default Question;