import React from 'react';
import Speedometer from './Speedometer';

const Box = () => {
  const depressionValue = 10;
  const stressValue = 9;
  const anxietyValue = 3;
  const overall=(depressionValue+stressValue+anxietyValue)/3;

  return (
    <>
      <div className="Box">
        <div className="depression dabba">
          <div><Speedometer prompt={depressionValue} /></div>
          <div>Depression</div>
        </div>
        <div className="stress dabba">
          <div><Speedometer prompt={stressValue} /></div>
          <div>Stress</div>
        </div>
        <div className="anxiety dabba">
          <div><Speedometer prompt={anxietyValue} /></div>
          <div>Anxiety</div>
        </div>
        <div className="overall dabba">
          <div><Speedometer prompt={overall} /></div>
          <div>overall</div>
        </div>
      </div>
    </>
  );
}

export default Box;
