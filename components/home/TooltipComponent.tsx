const TooltipComponent = ({ content }: any) => {
    return (
        <>
            <style>
                {`
                    .tooltip_container {
                        display: inline-flex;
                        padding: 10px;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        border-radius: 4px;
                        background: #313131;
                        box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.25);
                    }
                    .tooltip_content {
                        color: #FFF;
                        font-family: Roboto;
                        font-size: 15px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                    }
                    .custom-tooltip {
                        .ant-popover-arrow::after {
                            background: #313131;
                        }
                        .ant-popover-content {
                            .ant-popover-inner {
                                padding: 0;
                            }
                        }
                    }
                `}
            </style>
            <div className='tooltip_container'>
                <p className='tooltip_content'>{content}</p>
            </div>
        </>
    );
};
export default TooltipComponent;