import { BORED_APE_TOKEN_ADDRESS, Agent, Network } from '../../src'
import BORED_APE_METADATA_STUB from '../mock-reponses/contracts/boredApeYacht/1.json'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const BORED_APE_CRITERIA = {
  input: {
    tokenId: '1',
    tokenAddress: BORED_APE_TOKEN_ADDRESS,
  },
  output: {
    metadata: BORED_APE_METADATA_STUB,
    tokenURL:
      'https://gateway.ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1',
    tokenURLMimeType: 'application/json',
    contentURL:
      'https://gateway.ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi',
    contentURLMimeType: 'image/png',
    attributes: BORED_APE_METADATA_STUB.attributes,
  },
}

describe('Bored Ape ERC721', () => {
  const parser = new Agent({
    providers: {
      [Network.MAINNET]: testProvider,
    },
    ipfsGateway: 'https://dweb.link',
    fetchTimeout: 15000,
  })

  beforeEach(() => {
    jest.setTimeout(60000)
  })

  it(`should be able to fetch and parse metadata for token id: ${BORED_APE_CRITERIA.input.tokenId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      BORED_APE_CRITERIA.input.tokenAddress,
      BORED_APE_CRITERIA.input.tokenId,
    )
    expect(meta).toStrictEqual(BORED_APE_CRITERIA.output)
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
