import * as React from "react";

interface ICollapseButtonProps {
    collapsed: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface ICollapseButtonState {
}

export class CollapseButton extends React.Component<ICollapseButtonProps, ICollapseButtonState> {

    constructor(props: ICollapseButtonProps) {
        super(props);
        this.state = {};
    }

    render() {
        const {collapsed, onClick} = this.props;
        return (
            <div className="btn-collapse " onClick={onClick}>
                {collapsed ? "+" : "-"}
            </div>
        );
    }

}