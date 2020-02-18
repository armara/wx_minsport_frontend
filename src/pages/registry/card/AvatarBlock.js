import React from 'react'
import PropTypes from 'prop-types'

import IconButton from 'components/button/iconButton/IconButton'

import { ageFrom } from 'utils/day'
import pluralizeWord from 'utils/pluralizeWord'

import './AvatarBlock.scss'

const titles = ['год', 'года', 'лет']

const getAge = birthDate => {
  if (!birthDate) {
    return 'Возраст не указан'
  }

  const age = ageFrom(birthDate)
  return `${age} ${pluralizeWord(age, titles)}`
}

const AvatarBlock = ({ person, onEditClick, onMailClick, onDeleteClick }) => {
  return (
    <div className="avatar-block">
      <img src={person.avatar} alt="Фото" />
      <div className="info">
        <div className="fio-age">
          <span className="fio">{person.fioFull}</span>
          <span className="age">{getAge(person.birthDate)}</span>
        </div>
        <div className="icons">
          <IconButton className="ic-mail-round" onClick={onMailClick} />
          <IconButton className="ic-edit-round" onClick={onEditClick} />
          <IconButton className="ic-delete-round" onClick={onDeleteClick} />
        </div>
      </div>
    </div>
  )
}

AvatarBlock.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string,
    fioFull: PropTypes.string,
    birthDate: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onMailClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default AvatarBlock
