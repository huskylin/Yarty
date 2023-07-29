interface Props {
    data: any[];
    from: string;
}

interface TitleProps {
    lines?: string;
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
}
