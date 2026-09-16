from base64 import b64encode
from pathlib import Path

import streamlit as st


ROOT = Path(__file__).parent
BACKGROUND_PATH = ROOT / "public" / "background.png"
CREDITS_SYMBOL_PATH = ROOT / "public" / "credits-symbol.png"


def image_data_uri(path: Path) -> str:
    mime_type = "image/png"
    encoded = b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


def credits_amount(value: float) -> str:
    return f"{value:.2f}"


st.set_page_config(
    page_title="Critical Ops Tax Calculator",
    page_icon=str(CREDITS_SYMBOL_PATH),
    layout="centered",
)

background_uri = image_data_uri(BACKGROUND_PATH)
credits_uri = image_data_uri(CREDITS_SYMBOL_PATH)

st.markdown(
    f"""
    <style>
        .stApp {{
            background: linear-gradient(rgba(8, 12, 24, 0.76), rgba(8, 12, 24, 0.76)),
                        url('{background_uri}') center / cover fixed no-repeat;
            color: #f8fafc;
        }}
        [data-testid="stHeader"] {{ background: transparent; }}
        .calculator-panel {{
            background: rgba(15, 23, 42, 0.86);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
        }}
        .amount {{
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-weight: 700;
        }}
        .amount img {{ width: 1.35rem; height: 1.35rem; object-fit: contain; }}
        .result-row {{
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            padding: 0.7rem 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.18);
        }}
        .result-row:last-child {{ border-bottom: 0; }}
        .tax {{ color: #fde047; }}
        .profit {{ color: #6ee7b7; font-size: 1.15rem; }}
        .loss {{ color: #fca5a5; font-size: 1.15rem; }}
    </style>
    """,
    unsafe_allow_html=True,
)

st.title("Critical Ops Tax Calculator")
st.caption("Calculate buying tax, selling tax, and after-tax profit in Credits.")

with st.container(border=False):
    st.markdown('<div class="calculator-panel">', unsafe_allow_html=True)
    st.subheader("Enter values")
    buying_value = st.number_input(
        "Buying value",
        min_value=0.0,
        value=None,
        step=0.01,
        format="%.2f",
        placeholder="0.00",
    )
    selling_value = st.number_input(
        "Selling value",
        min_value=0.0,
        value=None,
        step=0.01,
        format="%.2f",
        placeholder="0.00",
    )

    if buying_value is not None:
        buying_tax = buying_value * 0.25
        total_buying_cost = buying_value + buying_tax
    else:
        buying_tax = total_buying_cost = None

    if selling_value is not None:
        selling_tax = selling_value * 0.20
        net_selling_value = selling_value - selling_tax
    else:
        selling_tax = net_selling_value = None

    if total_buying_cost is not None and net_selling_value is not None:
        profit = net_selling_value - total_buying_cost
    else:
        profit = None

    st.markdown("### Results")

    def render_amount(label: str, value: float | None, class_name: str = "") -> None:
        if value is None:
            display = "-"
        else:
            display = (
                f'<span class="amount"><img src="{credits_uri}" alt="">'
                f"{credits_amount(value)}</span>"
            )
        st.markdown(
            f'<div class="result-row"><span>{label}</span>'
            f'<strong class="{class_name}">{display}</strong></div>',
            unsafe_allow_html=True,
        )

    render_amount("Buying Value", buying_value)
    render_amount("Buying Tax (25%)", buying_tax, "tax")
    render_amount("Total Buying Cost", total_buying_cost)
    render_amount("Selling Value", selling_value)
    render_amount("Selling Tax (20%)", selling_tax, "tax")
    render_amount("Net Selling Value", net_selling_value)
    render_amount("PROFIT", profit, "profit" if profit is None or profit >= 0 else "loss")
    st.markdown("</div>", unsafe_allow_html=True)

st.caption("Enter both values to calculate the after-tax profit.")
