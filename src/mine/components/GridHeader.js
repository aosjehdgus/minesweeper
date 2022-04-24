/* eslint-disable no-plusplus */
import React from 'react';
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
  const { game, mine } = useSelector(minesweeperSelector.all);
  const { GAME_SET } = minesweeperAction;

  const restartBtn = () => {
    dispatch(GAME_SET());
  };

  return (
    <Header>
      <MineCount>
        <FcFlashOn />
        {mine}
      </MineCount>
      <RestartBtn type="button" onClick={() => restartBtn()}>
        {game ? <FaRegLaughBeam size={25} /> : <FaRegFrown size={25} />}
      </RestartBtn>
      <SetRecord>123</SetRecord>
    </Header>
  );
};

export default GridHeader;
