

function Heading(props: { children: React.ReactNode }) {
    return (
        <div className="border-l-4 border-black pl-2 py-2 mb-4">
            <h2 className="text-xl font-bold">{props.children}</h2>
        </div>
    )
}

export default Heading