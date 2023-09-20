import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret
} from 'lib/sanity.api'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: false,
  perspective: 'published'
})
