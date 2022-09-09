import './home.scss';

import { useState } from 'react';
import LESSION_JP from './class';
import { Button, Input, ButtonGroup, FormFeedback } from 'reactstrap';
import _ from 'lodash';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export enum MODE_CHECK {
  JP,
  SPELLING,
  VIETNAM
}

export const Home = () => {
  // const account = useAppSelector(state => state.authentication.account);
  const [source, setSource] = useState<any>(LESSION_JP.ALPHABET.HIRAGANA_ABC.source);
  const [showNumber, setShowNumber] = useState(5);
  const [inputSearch, setInputSearch] = useState("");
  const [data, setData] = useState<any>([]);
  const [finishCheckFlag, setFinishCheckFlag] = useState(false);
  const [mode, setMode] = useState<MODE_CHECK>(MODE_CHECK.JP);
  const [rSelected, setRSelected] = useState(LESSION_JP.ALPHABET.HIRAGANA_ABC.key);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [titleDropdown, setTitleDropdown] = useState(LESSION_JP.ALPHABET.HIRAGANA_ABC.title);
  const [maxInput, setMaxInput] = useState(Object.keys(LESSION_JP.ALPHABET.HIRAGANA_ABC.source).length);
  const [searchResult, setSearchResult] = useState(null)

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
        if (rSelected === LESSION_JP.ALPHABET.HIRAGANA_ABC.key || rSelected === LESSION_JP.ALPHABET.KATAKANA_ABC.key || rSelected === "AA") {
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
      setSearchResult(null)
      setFinishCheckFlag(false);
      setData(tmpData);
    }
  }

  const resultCheck = () => {
    setSearchResult(null)
    setFinishCheckFlag(true)
  }

  const renderABC = () => {
    return (<>
      {data.map((e: any, i: any) => {
        if (mode === MODE_CHECK.JP) {
          return (
            <div className='hiragana-item' key={"ra" + i}>
              <div className='hiragana-k'>{i + 1} - {_.get(e, "v")}</div>
              {finishCheckFlag && <><hr /><div className='hiragana-v'>{_.get(e, "k")}</div></>}
            </div>
          )
        }
        return (
          <div className='hiragana-item' key={"ra" + i}>
            <div className='hiragana-k'>{i + 1} - {_.get(e, "k")}</div>
            {finishCheckFlag && <><hr /><div className='hiragana-v'>{_.get(e, "v")}</div></>}
          </div>
        )
      })}
    </>
    )
  }

  const renderLessionOther = () => {
    return (<>
      {data.map((e: any, i: any) => {
        if (mode === MODE_CHECK.JP) {
          return (<>
            <div className='hiragana-item' key={"rl" + i}>
              <span className='hiragana-k'>{i + 1} - {_.get(e, "j")} {_.get(e, "o_j") ? ` (${_.get(e, "o_j")})` : ""}</span>
              {finishCheckFlag && <span>
                <div className='hiragana-v'>{_.get(e, "s")} {_.get(e, "o_s") ? ` (${_.get(e, "o_s")})` : ""}</div>
                <hr />
                <div className='hiragana-v'>{_.get(e, "t")}</div>
              </span>
              }
            </div>
          </>)
        } else {
          return (
            <div className='hiragana-item' key={"rl" + i}>
              <span className='hiragana-k'>{i + 1} - {_.get(e, "t")}</span>
              {finishCheckFlag && <span>
                <div className='hiragana-v'>{_.get(e, "j")} {_.get(e, "s") ? ` (${_.get(e, "s")})` : ""}</div>
                <hr />
                <div className='hiragana-v'>{_.get(e, "o_j")} {_.get(e, "o_s") ? ` (${_.get(e, "o_s")})` : ""}</div>
              </span>
              }
            </div>
          )
        }
      })}
    </>
    )
  }

  const renderSearchResult = () => {
    return (<>
      <div className='hiragana-item'>
        <span className='hiragana-k'>{_.get(searchResult, "jp")} {_.get(searchResult, "other") ? ` (${_.get(searchResult, "other.jp")})` : ""}</span>
        <span>
          <div className='hiragana-v'>{_.get(searchResult, "spelling")} {_.get(searchResult, "other.spelling") ? ` (${_.get(searchResult, "other.spelling")})` : ""}</div>
          <hr />
          <div className='hiragana-v'>{_.get(searchResult, "translate_vn")}</div>
        </span>
      </div>
    </>)
  }

  const renderMode = () => {
    return <>
      <ButtonGroup className='mode-check'>
        <Button color='info' outline onClick={() => { setMode(MODE_CHECK.JP) }} active={mode === MODE_CHECK.JP}>
          JP
        </Button>
        {(rSelected === LESSION_JP.ALPHABET.HIRAGANA_ABC.key || rSelected === LESSION_JP.ALPHABET.KATAKANA_ABC.key) &&
          <Button color='info' outline onClick={() => { setMode(MODE_CHECK.SPELLING) }} active={mode === MODE_CHECK.SPELLING}>
            Spelling
          </Button>
        }
        {
          !(rSelected === LESSION_JP.ALPHABET.HIRAGANA_ABC.key || rSelected === LESSION_JP.ALPHABET.KATAKANA_ABC.key) &&
          <Button color='info' outline onClick={() => { setMode(MODE_CHECK.VIETNAM) }} active={mode === MODE_CHECK.VIETNAM}>
            Vietnam
          </Button>
        }
      </ButtonGroup>
    </>
  }

  const allLessonSource = () => {
    const lesson = LESSION_JP.LESSON
    let sourceLesson = {}
    Object.keys(lesson).forEach(e => {
      Object.assign(sourceLesson, _.get(lesson, e)['source'])
    })
    return sourceLesson
  }

  const all = (type: string) => {
    setTitleDropdown(type)
    if (type === "All alphabet") {
      const sourceAlphabet = Object.assign(LESSION_JP.ALPHABET.HIRAGANA_ABC.source, LESSION_JP.ALPHABET.KATAKANA_ABC.source)
      setSource(sourceAlphabet)
      setMaxInput(Object.keys(sourceAlphabet).length)
      setRSelected("AA")
    } else if (type === "All lesson") {
      const sourceLesson = allLessonSource()
      setSource(sourceLesson)
      setMaxInput(Object.keys(sourceLesson).length)
      setRSelected("AL")
    }
  }

  const renderSelectLesson = () => {
    const alpabet = LESSION_JP.ALPHABET
    const lesson = LESSION_JP.LESSON
    return (
      <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle caret>
          {titleDropdown}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>All</DropdownItem>
          <DropdownItem onClick={() => { all('All alphabet') }}>All alphabet</DropdownItem>
          <DropdownItem onClick={() => { all('All lesson') }}>All lesson</DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Alphabet</DropdownItem>
          {
            Object.keys(alpabet).map((e, i) => {
              return (
                <DropdownItem key={"a" + i}
                  onClick={() => {
                    setRSelected(_.get(alpabet, e)['key']);
                    setSource(_.get(alpabet, e)['source']);
                    setTitleDropdown(_.get(alpabet, e)['title'])
                    setMaxInput(Object.keys(_.get(alpabet, e)['source']).length)
                  }}>
                  {_.get(alpabet, e)['title']}
                </DropdownItem>
              )
            })
          }
          <DropdownItem divider />
          <DropdownItem header>Lesson</DropdownItem>
          {
            Object.keys(lesson).map((e, i) => {
              return (
                <DropdownItem key={"l" + i}
                  onClick={() => {
                    setRSelected(_.get(lesson, e)['key']);
                    setSource(_.get(lesson, e)['source']);
                    setTitleDropdown(_.get(lesson, e)['title'])
                    setMaxInput(Object.keys(_.get(lesson, e)['source']).length)
                  }}>
                  {_.get(lesson, e)['title']}
                </DropdownItem>
              )
            })
          }
        </DropdownMenu>
      </Dropdown>
    )
  }

  const search = () => {
    const allSOurce = allLessonSource()
    let res = null;
    for (const key in allSOurce) {
      if (_.get(allSOurce, `${key}.jp`) === inputSearch || _.get(allSOurce, `${key}.other.jp`) === inputSearch) {
        res = _.get(allSOurce, `${key}`)
      }
    }
    console.log(res)
    setData([])
    setSearchResult(res)
  }

  return (
    <>
      <div>
        <div className='mb-search-custom '>
          <Input className='input-show-number'
            type='text'
            placeholder="Search..."
            invalid={showNumber > Object.keys(source).length}
            onChange={(v) => {
              setInputSearch(v.target.value)
            }} />
          <Button onClick={search} color="primary" style={{ marginLeft: "30px" }}>Search</Button>
        </div>
        <hr />
        <div style={{ marginBottom: "15px" }}>
          {renderSelectLesson()}
        </div>
        <div className='mb-custom'>
          <Input className='input-show-number'
            id="input-show-number"
            type='number'
            placeholder={"Max input: " + maxInput}
            defaultValue={showNumber ?? 5}
            max={Object.keys(source).length}
            invalid={showNumber > Object.keys(source).length}
            min={1}
            onChange={(v) => {
              setShowNumber(!_.isNaN(parseInt(v.target.value, 10)) ? parseInt(v.target.value, 10) : 5)
            }} />
          {showNumber > Object.keys(source).length && <FormFeedback>Oh noes! Max input is {maxInput}</FormFeedback>}
        </div>
        <div className='refresh-button'>
          <Button onClick={generateCheck} color="primary" style={{ marginRight: "30px" }}>Start Check</Button>
          <Button onClick={resultCheck} color="success" style={{ marginRight: "30px" }}>Result</Button>
          {renderMode()}
        </div>
        <div className='text-check'>
          {
            (rSelected === LESSION_JP.ALPHABET.HIRAGANA_ABC.key || rSelected === LESSION_JP.ALPHABET.KATAKANA_ABC.key || rSelected === "AA") ? renderABC() : renderLessionOther()
          }
          {
            searchResult && renderSearchResult()
          }
        </div>
      </div>
    </>
  );
};

export default Home;
