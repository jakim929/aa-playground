import { Providers } from '@/Providers'
import { TestLightAccount } from '@/components/TestLightAccount'
import { Button } from '@/components/ui/button'
import { ConnectKitButton } from 'connectkit'

function App() {
  return (
    <Providers>
      <div className="text-3xl">
        <TestLightAccount />
        <ConnectKitButton />
        Hello world<Button>Hello button</Button>
      </div>
    </Providers>
  )
}

export default App
