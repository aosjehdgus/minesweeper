/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegLaughBeam } from '@react-icons/all-files/fa/FaRegLaughBeam';
import { FaRegFrown } from '@react-icons/all-files/fa/FaRegFrown';
import { FcFlashOn } from '@react-icons/all-files/fc/FcFlashOn';
import { minesweeperAction, minesweeperSelector } from '../slice';

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 1rem 0 1rem 0;
`;

const MineCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const RestartBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background: inherit;
  cursor: pointer;
`;

const SetRecord = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const GridHeader = () => {
  const dispatch = useDispatch();
  const { game, mine, timer } = useSelector(minesweeperSelector.all);
  const { GAME_SET } = minesweeperAction;
  const [sec, setSec] = useState(0);

  const time = useRef(0);
  const timerId = useRef(null);

  const restartBtn = () => {
    setSec(0);
    time.current = 0;
    dispatch(GAME_SET());
  };

  useEffect(() => {
    if (timer) {
      timerId.current = setInterval(() => {
        setSec(time.current % 60);
        time.current += 1;
      }, 1000);
      return () => clearTimeout(timerId.current);
    }
  }, [timer]);

  return (
    <Header>
      <MineCount>
        <FcFlashOn />
        {mine}
      </MineCount>
      <RestartBtn type="button" onClick={() => restartBtn()}>
        {game ? <FaRegLaughBeam size={25} /> : <FaRegFrown size={25} />}
      </RestartBtn>
      <SetRecord>{sec}</SetRecord>
    </Header>
  );
};

export default GridHeader;
