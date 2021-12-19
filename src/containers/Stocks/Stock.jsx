import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Add from './Add';
import Unpin from './Unpin';
import Pin from './Pin';
import Delete from './Delete';

function Stock({
  className,
  Symbol,
  Price,
  Change,
  UpDown,
  onPin,
  onUnpin,
  onAdd,
  isShowPin,
  isPinned,
  onDelete,
}) {
  return (
    <div
      className={classNames(
        className,
        'h-16 bg-gray-100 my-4 rounded-xl flex items-center px-2'
      )}
    >
      <div className="flex items-center">
        <div className="h-8 w-8 bg-gray-200 rounded-xl square-toolbox flex items-center justify-center hover:w-16">
          {!isShowPin ? (
            <Add onClick={() => onAdd(Symbol)} />
          ) : isPinned ? (
            <Unpin onClick={() => onUnpin(Symbol)} />
          ) : (
            <Pin onClick={() => onPin(Symbol)} />
          )}
          {isShowPin && <Delete onClick={() => onDelete(Symbol)} />}
        </div>
        <div>
          <div className="ml-2 text-sm font-medium text-left">{Symbol}</div>
          <div className="ml-2 text-xs font-light text-left">{Symbol}</div>
        </div>
      </div>
      <div className="grow flex flex-row-reverse">
        <div className="mr-2">
          <div className="font-bold">{Price}K VNĐ</div>
          <div
            className={classNames('font-semibold', {
              'text-green-400': UpDown !== 1,
              'text-red-400': UpDown === 1,
            })}
          >
            {Change}
          </div>
        </div>
      </div>
    </div>
  );
}

export default styled(Stock)`
  .square-toolbox {
    > div {
      visibility: hidden;
    }
    &:hover {
      > div {
        visibility: visible;
      }
    }
  }
`;
