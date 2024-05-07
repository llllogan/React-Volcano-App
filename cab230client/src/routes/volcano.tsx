import { createFileRoute } from '@tanstack/react-router'
import SingleViewContainer from '../components/rightContainer/singleVolcano/SingleViewContainer'

export const Route = createFileRoute('/volcano')({
  component: DetailedVolcanoView
})

function DetailedVolcanoView() {
    return (
        <SingleViewContainer />
    )
}