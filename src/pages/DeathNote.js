import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { snakeCase } from 'lodash'

const DeathNoteContainer = styled.div`
  margin: 50px;
  display: flex;
  justify-content: space-around;
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

  useEffect(() => {
    setVictims((currentVictims) => {
      if (currentVictims.length > 2) {
        const nextVictimIndex = Math.floor(Math.random() * currentVictims.length)
        currentVictims[nextVictimIndex].isDead = true
      }
      return currentVictims
    })
  }, [victims])

  useEffect(() => undefined, [])

  const addVictim = () => {
    setVictims([...victims, { name: draft, isDead: false }])
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
      <div>
        <h2>Hunting board</h2>
        <VictimList>
          {victims.map(({ name, isDead }) => (
            <Victim name={name} isDead={isDead} key={name} />
          ))}
        </VictimList>
      </div>
    </DeathNoteContainer>
  )
}

export default DeathNote
