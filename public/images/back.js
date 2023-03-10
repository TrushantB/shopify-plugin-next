const BackCover = ({ color }) => {
    return (
        <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1050" width="900" height="1050">
            <title>New Project</title>
            <defs>
                <image width="900" height="150" id="img1" href="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDkwMCAxNTAiIHdpZHRoPSI5MDAiIGhlaWdodD0iMTUwIj4KCTx0aXRsZT5OZXcgUHJvamVjdDwvdGl0bGU+Cgk8ZGVmcz4KCQk8aW1hZ2UgIHdpZHRoPSI5MDAiIGhlaWdodD0iMTUwIiBpZD0iaW1nMSIgaHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUE0UUFBQUNXQVFNQUFBQzhkdFIxQUFBQUFYTlNSMElCMmNrc2Z3QUFBQU5RVEZSRkFBQUFwM285MmdBQUFBRjBVazVUQUVEbTJHWUFBQUFuU1VSQlZIaWM3Y0V4QVFBQUFNS2c5VTl0Q1UrZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQU9CalFzd0FBZG1nSGxBQUFBQUFTVVZPUks1Q1lJST0iLz4KCTwvZGVmcz4KCTxzdHlsZT4KCQkuczAgeyBmaWxsOiAjMDAwMDAwIH0gCgk8L3N0eWxlPgoJPHVzZSBpZD0iQmFja2dyb3VuZCIgaHJlZj0iI2ltZzEiIHg9IjAiIHk9IjAiLz4KCTxwYXRoIGlkPSJTaGFwZSAxIiBjbGFzcz0iczAiIGQ9Im0tMC41LTY2LjNoOTE0LjZ2MTU1LjNoLTczOS4xbC02MSA2MS0xMjcgMTMgMy0xODF6Ii8+Cjwvc3ZnPg==" />
                <image width="900" height="354" id="img2" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAAFiCAMAAACZEua/AAAAAXNSR0IB2cksfwAAAL1QTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA69JzzAAAAD90Uk5TAKj/uqyfkwGdBbQEt7ECr6KhsAe2CL28vwnCBrsDtaarC8cOzAyzuBAR1BQSD9EKw8DFyxbVE9nQGNjcFUDSNwLK2wAABU5JREFUeJzt3etyFFUARtEhICFEQS4DRgQNCoSLgDcUFN7/sYghxUQIMvzo3k16rSeY+ap21alT3TOLBbByamN09VeGSTk9foMihCPOBA2KEFa+KBoUIbx1NmlQhHBo81zToAjhUHAvKkJY2TpfNShCONA1KELYt/1l16AIYd9XYYMihMWFi2WDIoTNr9MGRcjsbV5qGxQhc5c3KELmLj6LipC5275cJyhC5u3K1brADREya8trdYD/qleAzjQaFCHztbxe5/dGvQNUrnxT13eoHgIiO1NpUITM1PLbur236ikgceO7Or2Vegso3LxVl3dEPQYUvq/DO6oeAwI/1N39R70GjG5rCs+qHVHvAWPbmdCdzIF6EBjZ7u06unfVi8C4fvypbu499SQwqjvTa1CEzMrydl3cMepRYETbU7uTOVCvAiO6W/d2rHoVGM1W8V/Ya6h3gbEs79W1fUA9DIxkIr9lcYx6GRjHjck2KEJmYqpn0Q0RMg+703mP/n31ODCCvQk+J7NSrwPDu/+g7ux/1fPA4B5Ou0ERcuI9mniDIuSk+/lxHdnH1AvBsJ5M+k7mQD0RDOrJ0zqxj6s3giF9Dg2KkJNs55c6sHXUK8Fw7vxa97WWeiYYzN5vdV7rqXeCofz+R13XmuqhYCDP/qzjWle9FAxj76+6rbXVU8Egnr+o01pfvRUM4dnfdVmfoB4LBvDP53MW3bd4CSfOq7qrT7KoPwDMnQghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCEmQoiJEGIihJgIISZCiIkQYiKEmAghJkKIiRBiIoSYCCH2GiSeEAGsQj8AAAAAAElFTkSuQmCC" />
            </defs>
            <style>
            </style>
            <use id="New Project" href="#img1" transform="matrix(1,0,0,1,0,0)" />
            <use id="Layer 2" href="#img2" x="0" y="696" />
        </svg>
    )
}
export default BackCover;