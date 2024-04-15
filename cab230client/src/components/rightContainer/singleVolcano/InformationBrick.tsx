
interface Props {
    title: string;
    information: string;
}

export default function InformationBrick(props: Props) {

    return (
        <>
            <h6 style={{color: "grey"}} >{props.title}</h6>
            <h5>{props.information}</h5>
        </>
    )


}