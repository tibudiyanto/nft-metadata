import { JsonRpcProvider } from '@ethersproject/providers'
import { getIPFSUrl } from '../utils/ipfs'
import { fetchMetadata } from '../utils/fetch'

export async function parseGenericMetadata(
  _: JsonRpcProvider,
  __: string,
  ___: string,
  tokenURI: string,
) {
  const publicTokenURI = getIPFSUrl(tokenURI)
  const metadata = await fetchMetadata(tokenURI)

  if (!metadata.image && !metadata.animation_url) {
    throw new Error(
      `Invalid metadata required content params from metadata missing`,
    )
  }

  const imageURI = getIPFSUrl(metadata.image)
  const animationURI = metadata?.animation_url
    ? getIPFSUrl(metadata.animation_url)
    : null

  const { name, description, attributes, external_url: externalURL } = metadata
  const contentURI = animationURI || imageURI
  const previewURI = imageURI && animationURI ? imageURI : undefined

  return {
    metadata,
    tokenURI: publicTokenURI,
    contentURI,
    ...(previewURI && { previewURI }),
    ...(name && { name }),
    ...(description && { description }),
    ...(attributes && { attributes }),
    ...(externalURL && { externalURL }),
  }
}
