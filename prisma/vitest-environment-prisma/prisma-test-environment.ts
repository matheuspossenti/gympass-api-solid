import { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    console.log('Executou')

    return {
      teardown() {},
    }
  },
}
