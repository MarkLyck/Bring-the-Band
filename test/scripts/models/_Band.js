import {expect} from 'chai'

import Band from '../../../app/scripts/models/Band'

describe('band model', function() {
  let band = new Band()

  it('should exist', () => {
    expect(band).to.exist
  })

  it('should have a voteForBand() function', () => {
    expect(band).to.have.property('voteForBand')
  })

  it('should have a getVotes() function', () => {
    expect(band).to.have.property('getVotes')
  })

  it('should have a removeVote() function', () => {
    expect(band).to.have.property('removeVote')
  })

})
