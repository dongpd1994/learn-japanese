import './home.scss';

import { useState } from 'react';
import LESSION_JP from './class';
import { Button, Input, ButtonGroup } from 'reactstrap';
import _ from 'lodash';

export enum MODE_CHECK {
  JP,
  SPELLING,
  VIETNAM
}

export const Home = () => {
  // const account = useAppSelector(state => state.authentication.account);
  const [source, setSource] = useState(LESSION_JP.HIRAGANA_ABC.source);
  const [showNumber, setShowNumber] = useState(5);
  const [data, setData] = useState<any>([]);
  const [finishCheckFlag, setFinishCheckFlag] = useState(false);
  const [mode, setMode] = useState<MODE_CHECK>(MODE_CHECK.JP);
  const [rSelected, setRSelected] = useState(LESSION_JP.HIRAGANA_ABC.key);

  const generateCheck = () => {
    const va = (document.getElementById("input-show-number") as HTMLInputElement).value
    if (_.isNumber(showNumber) && showNumber > 0 && parseInt(va, 10) <= Object.keys(source).length) {
      const key = Object.keys(source);
      const l = key.length;
      const lstIndexKey: number[] = [];
      const tmpData = [];
      for (let i = 0; i < showNumber; i++) {
        let index = Math.floor(Math.random() * l);
        while (lstIndexKey.includes(index)) {
          index = Math.floor(Math.random() * l);
        }
        lstIndexKey.push(index);
        const keySource = key[index];
        if (rSelected === LESSION_JP.HIRAGANA_ABC.key || rSelected === LESSION_JP.KATAKANA_ABC.key) {
          tmpData.push({
            k: keySource,
            v: _.get(source, keySource)
          })
        } else {
          tmpData.push({
            s: _.get(_.get(source, keySource), "spelling"),
            j: _.get(_.get(source, keySource), "jp"),
            t: _.get(_.get(source, keySource), "translate_vn"),
            o_j: _.get(_.get(source, keySource), "other.jp") ?? null,
            o_s: _.get(_.get(source, keySource), "other.spelling") ?? null,
          })
        }

      }
      setFinishCheckFlag(false);
      setData(tmpData);
    }
  }

  const resultCheck = () => {
    setFinishCheckFlag(true)
  }

  const renderLession = () => {
    const lstLession = Object.keys(LESSION_JP);
    return (<div>
      <ButtonGroup>
        {
          lstLession.map((e, i) => {
            return (
              <Button key={i} color="primary" outline
                onClick={() => { setRSelected(_.get(LESSION_JP, [e, "key"])); setSource(_.get(LESSION_JP, [e, "source"])); setData([]) }}
                active={rSelected === _.get(LESSION_JP, [e, "key"])}
              >
                {_.get(_.get(LESSION_JP, e), "title")} {`(${Object.keys(_.get(LESSION_JP, [e, "source"])).length})`}
              </Button>
            )
          })
        }
      </ButtonGroup>
    </div>)
  }

  const renderABC = () => {
    return (<>
      {data.map((e: any, i: any) => {
        if (mode === MODE_CHECK.JP) {
          return (<>
            <div className='hiragana-item'>
              <span className='hiragana-k'>{i + 1} - {_.get(e, "v")}</span>
              {finishCheckFlag && <span className='hiragana-v'>{_.get(e, "k")}</span>}
            </div>
          </>)
        }
        return (<>
          <div className='hiragana-item'>
            <span className='hiragana-k'>{i + 1} - {_.get(e, "k")}</span>
            {finishCheckFlag && <span className='hiragana-v'>{_.get(e, "v")}</span>}
          </div>
        </>)
      })}
    </>
    )
  }

  const renderLessionOther = () => {
    return (<>
      {data.map((e: any, i: any) => {
        if (mode === MODE_CHECK.JP) {
          return (<>
            <div className='hiragana-item'>
              <span className='hiragana-k'>{i + 1} - {_.get(e, "j")} {_.get(e, "o_j") ? ` (${_.get(e, "o_j")})` : ""}</span>
              {finishCheckFlag && <span>
                <div className='hiragana-v'>{_.get(e, "s")} {_.get(e, "o_s") ? ` (${_.get(e, "o_s")})` : ""}</div>
                <hr />
                <div className='hiragana-v'>{_.get(e, "t")}</div>
              </span>
              }
            </div>
          </>)
        } else if (mode === MODE_CHECK.SPELLING) {
          return (<>
            <div className='hiragana-item'>
              <span className='hiragana-k'>{i + 1} - {_.get(e, "s")} {_.get(e, "o_s") ? ` (${_.get(e, "o_s")})` : ""}</span>
              {finishCheckFlag && <span className='hiragana-v'>
                <div>{_.get(e, "j")} {_.get(e, "o_j") ? ` (${_.get(e, "o_j")})` : ""}</div>
                <hr />
                <div className='hiragana-v'>{_.get(e, "t")}</div>
              </span>
              }
            </div>
          </>)
        } else {
          return (<>
            <div className='hiragana-item'>
              <span className='hiragana-k'>{i + 1} - {_.get(e, "t")}</span>
              {finishCheckFlag && <span>
                <div className='hiragana-v'>{_.get(e, "j")} {_.get(e, "s") ? ` (${_.get(e, "s")})` : ""}</div>
                <hr />
                <div className='hiragana-v'>{_.get(e, "o_j")} {_.get(e, "o_s") ? ` (${_.get(e, "o_s")})` : ""}</div>
              </span>
              }
            </div>
          </>)
        }
      })}
    </>
    )
  }

  const renderMode = () => {
    return <>
      <ButtonGroup>
        <Button color='primary' outline onClick={() => { setMode(MODE_CHECK.JP) }} active={mode === MODE_CHECK.JP}>
          JP
        </Button>
        <Button color='primary' outline onClick={() => { setMode(MODE_CHECK.SPELLING) }} active={mode === MODE_CHECK.SPELLING}>
          Spelling
        </Button>
        {
          !(rSelected === LESSION_JP.HIRAGANA_ABC.key || rSelected === LESSION_JP.KATAKANA_ABC.key) &&
          <Button color='primary' outline onClick={() => { setMode(MODE_CHECK.VIETNAM) }} active={mode === MODE_CHECK.VIETNAM}>
            Vietnam
          </Button>
        }
      </ButtonGroup>
    </>

  }

  return (
    <>
      <div>
        <div style={{ marginBottom: "15px" }}>
          {renderLession()}
        </div>
        <Input className='input-show-number'
          id="input-show-number"
          type='number'
          defaultValue={showNumber}
          max={Object.keys(source).length}
          min={0}
          onChange={(v) => {
            setShowNumber(parseInt(v.target.value, 10) > Object.keys(source).length ? Object.keys(source).length : parseInt(v.target.value, 10))
          }} />
        <div className='refresh-button'>
          <Button onClick={generateCheck} color="primary">Start Check</Button>
          <Button onClick={resultCheck} color="success" style={{ marginLeft: "30px", marginRight: "30px" }}>Result</Button>
          {renderMode()}
        </div>
        <div className='text-check'>
          {
            (rSelected === LESSION_JP.HIRAGANA_ABC.key || rSelected === LESSION_JP.KATAKANA_ABC.key) ? renderABC() : renderLessionOther()
          }
        </div>
      </div>
    </>
  );
};

export default Home;
