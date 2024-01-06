import React from 'react';
import Speedometer from './Speedometer';

const Box = () => {
  const depressionValue = 1;
  const stressValue = 2;
  const anxietyValue =4;
  const overall=(depressionValue+stressValue+anxietyValue)/3;

  return (
    <>
      <div className="Box">
        <div className="depression dabba">
          <div><Speedometer prompt={depressionValue} /></div>
          <div className='type-name'>Depression</div>
        </div>
        <div className="stress dabba">
          <div><Speedometer prompt={stressValue} /></div>
          <div className='type-name'>Stress</div>
        </div>
        <div className="anxiety dabba">
          <div><Speedometer prompt={anxietyValue} /></div>
          <div className='type-name'>Anxiety</div>
        </div>
        <div className="overall dabba">
          <div><Speedometer prompt={overall} /></div>
          <div className='type-name'>overall</div>
        </div>
      </div>
    </>
  );
}

export default Box;
