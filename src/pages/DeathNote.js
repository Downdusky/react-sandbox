import { useState } from 'react'
import styled from 'styled-components'
import { snakeCase } from 'lodash'

const DeathNoteContainer = styled.div`
  margin: 50px 150px;
  display: flex;
  justify-content: space-between;
`

const NoteBook = styled.div`
  background-image: url('death_note.png');
  background-size: cover;
  height: 400px;
  width: 400px;
  color: white;
  padding: 200px 30px 0;
  font-size: 1.5rem;
`

const HuntingBoard = styled.div`
  max-width: 50%;
  flex-grow: 1;
`

const VictimList = styled.div`
  display: flex;
  gap: 10px;
`

const VictimContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  flex-wrap: wrap;

  img {
    width: auto;
    position: absolute;
  }
`

const Avatar = styled.img`
  margin-left: -35px;
  height: 100%;
`

const Skull = styled.img`
  margin: 20px 25px;
  height: 80%;
  filter: invert(100%);
`
// props = { name: "Zozo", isDead: false }
const Victim = ({ name, isDead }) => {
  return (
    <VictimContainer>
      <Avatar src={`${snakeCase(name)}.png`} alt={name} />
      {isDead && <Skull src="skull.png" />}
    </VictimContainer>
  )
}

const DeathNote = () => {
  const [victims, setVictims] = useState([])
  const [draft, setDraft] = useState('')

  const killRandom = () => {
    if (victims.length >= 2) {
      const nextVictimIndex = Math.floor(Math.random() * victims.length)
      const updatedVictims = victims.map((victim, index) => (
        index === nextVictimIndex ? { ...victim, isDead: true } : victim
      ))
      return updatedVictims
    } else { return victims }
  }

  const addVictim = () => {
    const updatedVictims = killRandom()
    console.log(updatedVictims)
    setVictims([...updatedVictims, { name: draft, isDead: false }])
    setDraft('')
  }

  return (
    <DeathNoteContainer>
      <NoteBook>
        <ul>
          {victims.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <input type="text" value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button type="submit" onClick={addVictim}>Kill them</button>
        <button onClick={() => setVictims([])}>Reset</button>
      </NoteBook>
      <HuntingBoard>
        <h2>Hunting board</h2>
        <VictimList>
          {victims.map(({ name, isDead }) => (
            <Victim name={name} isDead={isDead} key={name} />
          ))}
        </VictimList>
      </HuntingBoard>
    </DeathNoteContainer>
  )
}

export default DeathNote
