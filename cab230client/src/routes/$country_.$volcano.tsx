import { createFileRoute } from '@tanstack/react-router'
import SingleViewContainer from '../components/rightContainer/singleVolcano/SingleViewContainer'

export const Route = createFileRoute('/$country/$volcano')({
  component: DetailedVolcanoView
})

function DetailedVolcanoView() {
    return (
        <SingleViewContainer />
    )
}